import openai
from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import json
from db import save_message, get_msgs, get_last_messages, save_chroma
#from chroma_db import collection

openai.api_key="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"

app = Flask(__name__)
CORS(app)

def get_system_message():
    try: 
        rows = get_last_messages().reverse()
        last_messages = ""
        for t in rows:
            for item in t:
                data_dict = json.loads(item)
                if data_dict["sender"] == "user":
                    sender = "\nUser"
                else:
                    sender = "Assistant"
                last_messages +=f'{sender}: {data_dict["data"][:250]}\n'

        print(last_messages)

        return "you are an ai assistant"

    except:
        return "you are an ai assistant"

def generate_response(message):
    #yield json.dumps({"message": "Hi there.."})
    try: 
        answer = ""
        messages = []
        system_message = get_system_message()
        messages.append({"role": "system", "content": system_message })
        messages.append({"role": "user", "content": message})

        print(message)
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-0613", messages=messages, temperature=0, stream=True
        )
        for line in response:
            choices = line["choices"][0]
            if not choices["finish_reason"]:
                content = choices["delta"].content
                answer += content
                yield json.dumps({"message":answer})

        save_message(message, 'user')
        save_message(answer, 'server')
        #save_chroma(message, answer, collection)


    except Exception as e:
        print(e)

@app.route('/message')
def message():
    try:
        message = request.headers.get('message')
        
        return Response(generate_response(message), mimetype="text/event-stream")
    except:
        return Response("error", mimetype="text/event-stream")

@app.route("/get_messages", methods=["GET"])
def get_messages():
    try: 
        rows = get_msgs()
        return jsonify({"message": rows})
    except:
        return jsonify({"message": rows})

if __name__=='__main__':
    app.run()
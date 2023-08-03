import chromadb
from chromadb.utils import embedding_functions

ef = embedding_functions.InstructorEmbeddingFunction(
    model_name = "hkunlp/instructor-xl", device="cuda"
)

class BaseVDB:
    def __init__(self):
        self.client = self._get_or_create_db()
    
    def _get_or_create_db(self):
        raise NotImplementedError
    
    def _get_or_create_collection(self):
        raise NotImplementedError
    
    def _list_collections(self):
        raise NotImplementedError

class ChromaDB(BaseVDB):
    def __init__(self):
        self.client_settings = chromadb.config.Settings(
            chroma_db_impl="duckdb+parquet",
            persist_directory="chromadb",
            anonymized_telemetry=False,
        )
        super().__init__()
    
    def _get_or_create_db(self):
        return chromadb.Client(self.client_settings)
    
    def _get_or_create_collection(self, collection_name: str):
        return self.client.get_or_create_collection(
            collection_name, embedding_function=ef
        )
    
    def _list_collections(self):
        return self.client.list_collections()

db = ChromaDB()
collection = db._get_or_create_collection("messages")
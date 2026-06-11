from pydantic import BaseModel , ConfigDict

class SearchRequest(BaseModel):
    model_config = ConfigDict(from_attributes=True) 
    query: str # the query to search for

    
class DocumentResult(BaseModel):
    id: str
    title: str
    snippet: str
    score: float
    source: str


class SearchResponse(BaseModel):
    query: str
    summary: str
    results: list[DocumentResult]
    count: int

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .models import SearchRequest, SearchResponse
from .search import search, summarize

app = FastAPI(title="Legal Document Search API")

# change allow_origins for prod
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Home"])
def home() -> dict:
    return {"message": "Welcome to the Legal Document Search API."}  
@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/generate", response_model=SearchResponse)
def generate(request: SearchRequest) -> SearchResponse:
    query = request.query.strip()
    if not query:  # pydantic strips whitespace but still lets an empty string through
        raise HTTPException(status_code=400, detail="Query must not be empty.")
    results = search(query)
    summary = summarize(query, results)
    return SearchResponse(query=query, summary=summary, results=results, count=len(results))
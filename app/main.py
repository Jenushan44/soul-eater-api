from fastapi import FastAPI 

app = FastAPI()

@app.get("/")
def root(): 
  return {"message": "Soul Eater API is running"}
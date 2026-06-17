from fastapi import HTTPException, status

def find_item_by_id(data_list, item_id, error_message): 
  for item in data_list: 
    if item['id'] == item_id: 
      return item
  raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=error_message)

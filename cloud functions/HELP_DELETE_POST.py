import sys
import json
from pathlib import Path
from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result, ResultByKey

def main(dict):
    
    dict = dict["post_id"]
    
    client = Cloudant.iam("3205c8bb-12e8-4e6b-b669-fbe872bf29df-bluemix", "oxXUO9-AR5XOCXcQ9EJaVtIAY9DLPx77eUFCv2yrChqL", connect=True)
    client.connect()
    
    database_name = "auxilium"
    my_database = client.create_database(database_name)
    if my_database.exists():
        # Create a new document
        my_document = my_database[dict]
        my_document.delete()
        return {
            "message": "success"
        }

        
        
       
            
            
            
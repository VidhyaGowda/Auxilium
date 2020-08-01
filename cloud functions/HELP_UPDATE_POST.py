import sys
import json
from pathlib import Path
from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result, ResultByKey


def main(dict):

    document_id = dict["document_id"]
    new_data = dict['data']
    print('going to connect to db')
    client = Cloudant.iam("3205c8bb-12e8-4e6b-b669-fbe872bf29df-bluemix",
                          "oxXUO9-AR5XOCXcQ9EJaVtIAY9DLPx77eUFCv2yrChqL", connect=True)
    client.connect()
    print('connected !')
    database_name = "auxilium"
    my_database = client.create_database(database_name)
    if my_database.exists():
        print('db present')
        if document_id in my_database:
            print('document is there in db')
            my_document = my_database[document_id]
            my_document['content'] = new_data['content']
            my_document['geometry'] = new_data['geometry']
            my_document['status'] = new_data['status']
            my_document['updated_on'] = new_data['updated_on']
            my_document.save()
            return {
                'message': 'success'
            }

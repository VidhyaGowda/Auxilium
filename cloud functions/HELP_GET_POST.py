import sys
import json
from pathlib import Path
from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result, ResultByKey
from cloudant.query import Query, QueryResult
from cloudant.document import Document
from cloudant.design_document import DesignDocument


def main(dict):

    doc_id = dict["user_id"]

    client = Cloudant.iam("3205c8bb-12e8-4e6b-b669-fbe872bf29df-bluemix",
                          "oxXUO9-AR5XOCXcQ9EJaVtIAY9DLPx77eUFCv2yrChqL", connect=True)
    client.connect()

    database_name = "auxilium"
    my_database = client.create_database(database_name)
    if my_database.exists:
        # index = my_database.create_query_index(
        # index_name='byID',
        # fields=['created_on'],
        # )
        # index.create()
        query = Query(my_database, selector={"user_id":
                                             {
                                                 "$eq": doc_id
                                             }
                                             }, fields=[
            "_id",
            "content.service",
            "content.description",
            "geometry",
            "created_on",
            "status",
            "user_id"
        ], sort=[
            {
                "created_on": "desc"
            }
        ], use_index="byID"
        )
        return {
            "posts": query()['docs']
        }

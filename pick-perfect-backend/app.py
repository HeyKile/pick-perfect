import json
import os

import google.generativeai as genai
from flask import Flask, jsonify, request
from flask_cors import CORS

API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=API_KEY)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "https://pick-perfect-ui-dot-mineral-cell-433922-k7.ue.r.appspot.com"}})

@app.route("/api/generate", methods=["POST"])
def generate_api():
    if request.method == "POST":
        if API_KEY == '':
            return jsonify({ "error": '''
                To get started, get an API key at
                https://g.co/ai/idxGetGeminiKey and enter it in
                main.py
                '''.replace('\n', '') }), 403
        try:
            req_body = request.get_json()
            content = req_body.get("base64image")
            img_type = req_body.get("img_type")
            generation_config = {
              "temperature": 1,
              "top_p": 0.95,
              "top_k": 40,
              "max_output_tokens": 8192,
              "response_mime_type": "application/json",
            }
            
            model = genai.GenerativeModel(
              model_name="gemini-1.5-flash",
              generation_config=generation_config,
              system_instruction="user is going to upload the image of a plant. your job is to identify what plant that is and say whether it is ripe enough to be picked/harvested. give output in JSON format annd also mention with how much confidence you can say that the plant is ready or not ready to be harvested. in the JSON repsonse also include a \\\"msg\\\" field that has a long sentence that specifies your findings in word and give some reasons as to how you ended up with your conclusion. dont inlcude the confidence stat in the sentence . example \\\"This plant is rice (give the the plant's scientific name) and it appears to be ripe enough to be picked/harvested.\n\nthe reponse should be in the format:\n{\nplant: string,\nripe: boolean,\nconfidence: double,\nmsg: string\n}\n\nthe msg is the long senetence",
            )
            
            prompt = ""
            
            response = model.generate_content([{'mime_type':f'{img_type}', 'data': f'{content}'}, prompt])
            print(response.text)
            return jsonify({"response" : response.text})
        except Exception as e:
            return jsonify({ "error": str(e) }), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)

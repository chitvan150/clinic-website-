from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

# Put your API key here
client = OpenAI(
    api_key="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"
)

@app.route("/chat", methods=["POST"])
def chat():

    data = request.json
    symptom = data["message"]

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role":"system",
                "content":
                """You are a homeopathy clinic AI assistant.
                Suggest possible homeopathic medicines based on symptoms.
                Always say consult doctor before medicine."""
            },

            {
                "role":"user",
                "content":symptom
            }
        ]
    )

    answer=response.choices[0].message.content

    return jsonify({
        "reply":answer
    })

if __name__=="__main__":
    app.run(debug=True)
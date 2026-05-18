from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# OPENROUTER API KEY

OPENROUTER_API_KEY = "paste _your_API_HERE"

# HOME PAGE

@app.route('/')
def home():

    return render_template('index.html')

# AI SUMMARY ROUTE

@app.route('/generate-summary', methods=['POST'])
def generate_summary():

    data = request.json

    role = data.get('role')
    skills = data.get('skills')
    projects = data.get('projects')

    prompt = f"""
Generate a professional ATS-friendly resume summary.

Role: {role}

Skills: {skills}

Projects: {projects}

Keep it concise, professional and 3-4 lines only.
"""

    try:

        response = requests.post(

            url="https://openrouter.ai/api/v1/chat/completions",

            headers={

                "Authorization": f"Bearer {OPENROUTER_API_KEY}",

                "Content-Type": "application/json"

            },

            json={

                "model": "openai/gpt-3.5-turbo",

                "messages": [

                    {

                        "role": "user",

                        "content": prompt

                    }

                ]

            }

        )

        result = response.json()
        print(result)

        summary = result['choices'][0]['message']['content']

        return jsonify({

            "summary": summary

        })

    except Exception as e:

        print(e)

        return jsonify({

            "summary": "AI generation failed"

        })

if __name__ == '__main__':

    app.run(debug=True, port=5050)
    
    
    
    
    
   

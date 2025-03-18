Wise Ranker

Wise Ranker is a Ruby on Rails application that allows users to rank items dynamically by dragging and reordering them. Each move contributes to a global ranking system, making it ideal for opinion-based ranking, prioritization, or voting systems.

Features

✅ Drag-and-drop ranking – Users can reorder items interactively.✅ Persistent rankings – Changes are stored in a PostgreSQL database.✅ API-driven – The app serves JSON for frontend interactions.✅ Real-time updates (Future Enhancement) – Plans to implement real-time rankings using WebSockets.✅ User authentication (Future Enhancement) – Planned feature to track rankings per user.

Setup & Installation

1️⃣ Clone the Repository

git clone https://github.com/travis-submachine/Wise-Ranker.git
cd Wise-Ranker

2️⃣ Install Dependencies

Ensure you have Ruby 3.x, Rails 7.x, and PostgreSQL installed.

bundle install

3️⃣ Set Up the Database

rails db:create db:migrate db:seed

4️⃣ Run the Application

rails server

App will be available at: http://localhost:3000

API Endpoints

Fetch Ranked Items

GET /ranking_items

curl http://localhost:3000/ranking_items

Returns:

[
  {"id":1, "name":"Item 1", "position":1, "rank_count":5},
  {"id":2, "name":"Item 2", "position":2, "rank_count":3}
]

Update Rankings (Drag-and-Drop)

PATCH /ranking_items

curl -X PATCH http://localhost:3000/ranking_items -H "Content-Type: application/json" -d '{"order": [3,1,2]}'

Deployment

🚀 Deploy to Fly.io

fly launch
fly deploy

🚀 Deploy to AWS Elastic Beanstalk (Optional)

eb init -p ruby WiseRanker
eb create wise-ranker-env
eb deploy

Roadmap



Contributing

Feel free to submit issues and pull requests! 🚀

License

MIT License © 2025 Travis Sutherland
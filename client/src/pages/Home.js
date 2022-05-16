
const Home = () => {
  const profiles = [
    {
      "id": 1,
      "user_id": 1,
      "pet_name": "Max",
      "size": "Medium",
      "breed": "Golden retriever",
      "species": "Dog",
      "age": "2",
      "picture": "https://i.imgur.com/WGYxLU0.jpeg"
    },
    {
      "id": 2,
      "user_id": 2,
      "pet_name": "Buster",
      "size": "Small",
      "breed": "Border Collie",
      "species": "Dog",
      "age": "1",
      "picture": "https://i.imgur.com/2HeX8GF.jpeg"
    },
    {
      "id": 3,
      "user_id": 3,
      "pet_name": "Poodle",
      "size": "Medium",
      "breed": "Poodle",
      "species": "Dog",
      "age": "3",
      "picture": "https://i.imgur.com/mlYFtTi.jpeg"
    }
  ]
  return (
    <>
    <nav>
      {/* this to be a partial maybe */}
    </nav>
    <main>
      <div>{profiles[0]}</div>
    </main>
    </>
  )
}
export default Home
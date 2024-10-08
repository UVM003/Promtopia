"use client"
import React ,{useEffect,useState}from 'react'
import PromptCard from './PromptCard'


const PromptCardList = ({ data, handleTagClick }) =>
   {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setsearchText] = useState('')
  const [searchTimeout, setsearchTimeout] = useState(null)
  const [searchedResults, setsearchedResults] = useState([])
  const [posts, setposts] = useState([])
  const fetchPosts = async ()=>
    {
      const res = await fetch("/api/prompt");
      const data=await res.json();
      setposts(data)
    }
  useEffect(() => {
   
fetchPosts()
  }, [])

 const filterPrompts = (searchText)=>
  {
    const regex = new RegExp(searchText,"i");
    return posts.filter(
      (item)=>
      regex.test(item.creator.username)||
      regex.test(item.tag)|| regex.test(item.prompt)
    )
  } 


const handleSearchChange = (e)=>
{
  clearTimeout(searchTimeout)
  setsearchText(e.target.value)

  setsearchTimeout(
    setTimeout(() =>
    {
      const searchResult=filterPrompts(e.target.value)
      setsearchedResults(searchResult)
    },500)
  )
}
const handleTagClick = (tagName) => {
  setsearchText(tagName);

  const searchResult = filterPrompts(tagName);
  setsearchedResults(searchResult);
};

  return (
    <section className='feed'>
      <form className='relative wifull flex-center'>
        <input
        type='text'
        placeholder="Search for a Tag or username"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer">
        </input>
      </form>
      { searchText? (
        <PromptCardList
        data={searchedResults}
        handleTagClick={handleTagClick}/>
      ):
    (
    <PromptCardList
    data={posts}
    handleTagClick={handleTagClick}/>
    )
  }
    </section>
  )
}

export default Feed
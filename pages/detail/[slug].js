
const url = 'https://jsonplaceholder.typicode.com/posts'

const Detail = ({ post }) => {
    const { title, body } = post
    return (
        <div>
            <h1>{title}</h1>
            <p>{body}</p>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    
    const { slug } = params;
 
    // Get the data
    const res = await fetch(`${url}/${slug}`);
    const post = await res.json();

  
    return { props: { post } };
}

export default Detail

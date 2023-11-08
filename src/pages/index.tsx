import { Inter } from 'next/font/google'
import { client } from '../../lib/apollo'
import { gql } from '@apollo/client'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ post }: any) {
	return (
		<main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
			<div className={inter.className}>
				<div className='max-w-full min-h-screen pt-24'>
					<h1 className='text-4xl font-bold text-center pb-20'>{post?.title}</h1>
					<section className='px-5 pb-5 space-y-8 text-xl leading-normal text-justify md:px-52 md:text-xl' dangerouslySetInnerHTML={{ __html: post?.content }} />
				</div>
			</div>

			<div className='mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left'>
				<a
					href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2 className={`mb-3 text-2xl font-semibold`}>
						Docs <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>-&gt;</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Find in-depth information about Next.js features and API.</p>
				</a>

				<a
					href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2 className={`mb-3 text-2xl font-semibold`}>
						Learn <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>-&gt;</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
				</a>

				<a
					href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2 className={`mb-3 text-2xl font-semibold`}>
						Templates <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>-&gt;</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Discover and deploy boilerplate example Next.js&nbsp;projects.</p>
				</a>

				<a
					href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2 className={`mb-3 text-2xl font-semibold`}>
						Deploy <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>-&gt;</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Instantly deploy your Next.js site to a shareable URL with Vercel.</p>
				</a>
			</div>
		</main>
	)
}

export async function getStaticProps({ params }: any) {
	const GET_POST = gql`
		query GetPostByURI($id: ID!) {
			post(id: $id) {
				title
				content
				date
				author {
					node {
						firstName
						lastName
					}
				}
			}
		}
	`
	//  the params argument for this function corresponds to the dynamic URL segments
	//  we included in our page-based route. So, in this case, the `params` object will have
	//  a property named `uri` that contains that route segment when a user hits the page
	const response = await client.query({
		query: GET_POST,
		variables: {
			id: 'cG9zdDo3',
		},
	})
	const post = response?.data?.post
	return {
		props: {
			post,
		},
	}
}

// export async function getStaticProps(){

//   // Paste your GraphQL query inside of a gql tagged template literal
//   const GET_POSTS = gql`
//     query AllPostsQuery {
//       posts {
//         nodes {
//           title
//           content
//           date
//           uri
//         }
//       }
//     }
//   `;
//   // Here we make a call with the client and pass in our query string to the
//   // configuration objects 'query' property
//   const response = await client.query({
//     query: GET_POSTS
//   });
//   // Once we get the response back, we need to traverse it to pull out the
//   // data we want to pass into the HomePage
//   const posts = response?.data?.posts?.nodes;

//   return {
//     props: {
//       posts
//     }
//   }
// }

import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'

const link = ApolloLink.from([
	new HttpLink({
		uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
		useGETForQueries: process.env.CACHE_GRAPHQL_RESPONSES !== 'false' ? true : false,
	}),
])

export const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
	defaultOptions: {
		query: {
			fetchPolicy: process.env.CACHE_GRAPHQL_RESPONSES !== 'false' ? 'cache-first' : 'network-only',
		},
	},
})

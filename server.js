const { GraphQLServer } = require('graphql-yoga');

let users = [
	{
		id: 1,
		name: 'Brian',
		age: '21',
		gender: 'M'
	},
	{
		id: 2,
		name: 'Kim',
		age: '22',
		gender: 'M'
	},
	{
		id: 3,
		name: 'Joseph',
		age: '23',
		gender: 'M'
	},
	{
		id: 3,
		name: 'Faith',
		age: '23',
		gender: 'F'
	},
	{
		id: 5,
		name: 'Joy',
		age: '25',
		gender: 'F'
	}
];

const resolvers = {
	Query: {
		user: function(parent, args, context, info) {
			var userID = args.id;
			return users.filter((user) => {
				return user.id == userID;
			})[0];
		},

		users: function(parent, args, context, info) {
			if (args.gender) {
				var gender = args.gender;
				return users.filter((user) => user.gender === gender);
			} else {
				return users;
			}
		}
	},

	Mutation: {
		updateUser: function(parent, { id, name, age }, context, info) {
			users.map((user) => {
				if (user.id === id) {
					user.name = name;
					user.age = age;
					return user;
				}
			});
			return users.filter((user) => user.id === id)[0];
		}
	}
};

const options = {
	endpoint: '/graphql',
	subscriptions: '/subscriptions',
	playground: '/playground'
};

const server = new GraphQLServer({
	typeDefs: './schema.graphql',
	resolvers: resolvers
});

server.start(options, () => console.log('Server is running on localhost:4000'));

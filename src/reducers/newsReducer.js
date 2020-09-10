const initalState = [
    {
        id: 1,
        title: "Lorem ipsum",
        description: "Lorem ipsum aveli shat lorem ipsum",
        created_at: (new Date()),
        published: false
    }
];

function newsReducer(state = initalState, action) {



    if (action.type === "ADD_NEW") {
        return [...state, action.payload];
    }
    if (action.type === "DELETE_NEWS") {

        // filter lets only one if == and deletes one if !==
        return state.filter(news => news.id !== action.payload.id);
    }


    if (action.type === "PUBLISH") {
        return state.map((news) => {
            if (news.id === action.payload.id)
                return { ...news, published: true }

            return news;
        })
    }
    return state;
}

export default newsReducer;
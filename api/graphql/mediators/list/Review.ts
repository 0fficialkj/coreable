/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Corables source code is free software; you can redistribute it
and/or modify it under the terms of the End-user license agreement.
Coreable's source code is distributed in the hope that it will be
useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
You should have received a copy of the license along with the 
Coreable source code.
===========================================================================
*/ 

import { 
  GraphQLObjectType, 
  GraphQLList
} from "graphql";

import { ReviewResolver } from "../../resolvers/Review";

export const ReviewListMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'ReviewListMediator',
  description: 'ReviewListMediator',
  fields: () => {
    return {
      'review': {
        type: new GraphQLList(ReviewResolver),
        resolve(data) {
          return data.review;
        }
      }
    }
  }
});

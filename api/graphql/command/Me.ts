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

import { CoreableErrorResolver } from "../resolvers/CorableError";
import { MeMediator } from "../mediators/Me";

export const MeCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'MeCommand',
  description: 'MeCommand',
  fields: () => {
    return {
      'data': {
        type: MeMediator,
        resolve(value) {
          return value.data;
        }
      },
      'errors': {
        type: new GraphQLList(CoreableErrorResolver),
        resolve(value) {
          return value.errors;
        }
      }
    }
  }
});
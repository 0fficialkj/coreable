import { sequelize } from "../../../lib/sequelize";
import {
  GraphQLString,
} from "graphql";

import { CoreableError } from "../../../models/CoreableError";
import { UserObjectCommand } from "../../command/object/User";
import { Team } from "../../../models/Team";
import { Subject } from "../../../models/Subject";
import { User } from "../../../models/User";

export default {
  type: UserObjectCommand, 
  args: {
    _id: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let user: any;
    if (!context.USER) {
      errors.push({ code: 'ER_UNAUTH', path: 'JWT' , message: 'User unauthenticated'});
    }
    if (!errors.length) {
      if (!args._id && !args.email) {
        errors.push({ code: 'ER_ARGS', message: 'A User _id or email must be provided as arguments', path: 'args' });
      }
    }
    if (!errors.length) {
      user = await sequelize.models.User.findOne(
        {
          where: args,
          include: [
            { model: Team, as: 'teams', 
            include: [
              { model: Subject, as: 'subject' },
              { model: User, as: 'users' }
            ], 
            exclude: ['inviteCode'] }
          ]
        }
      );
      if (!user) {
        errors.push({ code: 'ER_USER_UNKNOWN', path: `${args}`, message: `No user found with args ${args}` });
      }
    }
    return {
      'data': !errors.length ? {
        'user': user
      } : null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}
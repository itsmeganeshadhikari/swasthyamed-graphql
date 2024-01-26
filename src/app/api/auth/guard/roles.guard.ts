import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { log } from 'console';

export const Roles = {
  ADMIN: "admin",
  USER: "user"
}

@Injectable()
export class RolesGuard implements CanActivate {
  public role: string;
  
  constructor(role: string){
    this.role = role;
  }

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const {role} = ctx.req.user;
    if(role == this.role){
      return true;
    }
    else{
      return false;
    }
  }
}

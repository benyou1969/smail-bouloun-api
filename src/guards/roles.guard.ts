import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'modules/user/service/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // console.log('request', user.name);
    // this.userService.findOne(user.id).then((user) => console.log(user.name));
    console.log(roles.indexOf(user.roles) > -1);

    return user && roles.indexOf(user.roles) > -1;
  }
}

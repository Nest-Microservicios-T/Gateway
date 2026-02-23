import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
@Catch(RpcException)
export class RcpCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    console.log('Exception caught by RcpCustomExceptionFilter:');

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    //aca un objeto con el mensaje de retorno
    const rpcError = exception.getError();
    //console.log(rpcError);
    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = isNaN(+(rpcError as any).status)
        ? 400
        : +(rpcError as any).status;
      return response.status(status).json(rpcError);
    }

    response.status(400).json({
      status: 400,
      message: 'Error processing RPC request',
    });
  }
}

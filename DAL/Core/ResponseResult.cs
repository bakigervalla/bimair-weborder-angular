// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Core
{
    public class ResponseResult
    {
        public ResponseResult(bool succeeded, string[] errors = null, string message = null, object result = null)
        {
            Succeeded = succeeded;
            Errors = errors;
            Message = message;
            Result = result;
        }

        public ResponseResult(bool succeeded, string[] errors = null)
        {
            Succeeded = succeeded;
            Errors = errors;
        }

        public ResponseResult(bool succeeded, object result)
        {
            Succeeded = succeeded;
            Result = result;
        }

        public bool Succeeded { get; set; }
        public string[] Errors { get; set; }
        public string Message { get; set; }
        public object Result { get; set; }
    }
}

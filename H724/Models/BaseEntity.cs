using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace H724.Models
{
    public class BaseEntity<T>
    {
        //[PrimaryKey, NonUpdatable]
        public T Id { get; set; }
    }
}
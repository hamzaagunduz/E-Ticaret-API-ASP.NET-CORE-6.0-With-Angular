using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.ViewModel.Product
{
    public class VM_Update_Product
    {
        public string id { get; set; }
        public string name { get; set; }
        public int stock { get; set; }
        public float price { get; set; }
    }
}

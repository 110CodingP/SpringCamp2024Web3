let forsale =['Phone','SmartTV','Gaming Console'];
let sCart= [];
let cashRegister = {
    addItem : function (item) {
      let valid=false;
      for (let i=0;i<length(forsale);i++) {
        if (item===forsale[i]) {
            valid=true;
        }
      }
      if (valid) {
        sCart.push(item);
      }
      else {
        console.log("Sorry , we don't sell this");
      }
    },
    calcTotal: function {
        let price=0;
        for (let i=0;i<length(sCart); i++) {
          switch(sCart[i]) {
            case "Phone": price+=300;break;
            case "SmartTV": price+=220;break;
            case "Gaming Console": price+=150;
          }
        }
        if (price>400) {price*=0.9;}
        console.log(price);
    },
    pay: function(pt) {
      let price=this.calcTotal(sCart);
      if (pt===price) {
        console.log("Thanks");
      }
      else if (pt>price) {
        console.log("Thanks");
        console.log(`Here is the change of ${price-pt}`);
      }
      else if (pt<price) {
        console.log("Sorry that's not enough");
      }
    }
};
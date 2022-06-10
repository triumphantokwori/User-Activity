const draw = ({ label, value}) => {
  let max = Math.max(...value);
  let amount_size = value.length;
  let label_size = label.length;
  let output = result = labels = "";
  let tmp_max = max;

  for (let i = 0; i <= max; i++) {

      result=max - i + " ";
      if((max - i) == 0) break;
      for (let j = 0; j < amount_size; j++) {
        
        if(value[j] >= tmp_max){
          result+=" |||| ";
        }else{
          result+="      ";
        }
      }
    
      tmp_max--;
      output+=result+"\n";
    
    }
    for (let i = 0; i < label_size; i++) {
      labels+=label[i] + "   ";
    }

    console.log(output + "  " + labels);
};

module.exports = {draw};
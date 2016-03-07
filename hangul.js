var __init__ = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ','ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
var __medial__ = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ','ㅣ'];
var __final__ = ['','ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];	

var Hangul = {
	seperate: function(str){
		var result = [];
		for(var i = 0; i < str.length; i++) {
			var _charCode = str.charCodeAt(i);

			if(_charCode < 0xAC00 || _charCode > 0xD7A3) {
				result.push(str.charAt(i));
				continue;
			}
			_charCode-=0xAC00;
			var init_code, medi_code, fin_code;
		    fin_code = _charCode % 28;
		    medi_code = ((_charCode - fin_code) / 28 ) % 21;
		    init_code = (((_charCode - fin_code) / 28 ) - medi_code ) / 21;
		    result.push(__init__[init_code]);
			result.push(__medial__[medi_code]);
			result.push(__final__[fin_code]);
		}
		return result;
	},
	seperateToObject: function(str) {
		var result = [];
		for(var i = 0; i < str.length; i++) {
			var _charCode = str.charCodeAt(i);

			if(_charCode < 0xAC00 || _charCode > 0xD7A3) {
				result.push({
					isHangul:false,
					char:str.charAt(i)
				});
				continue;
			}
			_charCode-=0xAC00;
			var init_code, medi_code, fin_code;
		    fin_code = _charCode % 28;
		    medi_code = ((_charCode - fin_code) / 28 ) % 21;
		    init_code = (((_charCode - fin_code) / 28 ) - medi_code ) / 21;
		    result.push({
		    	isHangul:true,
		    	initial:__init__[init_code],
		    	medial:__medial__[medi_code],
		    	final:__final__[fin_code],
		    	char:str.charAt(i)
		    });
		}
		return result;
	},
	combine: function(str) {
		var result = '',
			arr = str.split('');
		for(var i = 0; i < arr.length; i++) {
			var flag = true;
			if(__final__.indexOf(arr[i]) != -1) {
				if(result.length && result.charCodeAt(result.length-1) >= 0xAC00 && result.charCodeAt(result.length-1) <= 0xD7A3 && Hangul.seperateToObject(result[result.length-1])[0].final == ''){
					result = result.substr(0,result.length-1) + String.fromCharCode(result.charCodeAt(result.length-1) + __final__.indexOf(arr[i]));
					flag = false;
				}
			} else if(__medial__.indexOf(arr[i]) != -1) {
				if(result.length){
				 	if(__init__.indexOf(result[result.length-1]) != -1){
						result = result.substr(0,result.length-1) + String.fromCharCode(0xAC00 + (__init__.indexOf(result[result.length-1]) * 588) + (__medial__.indexOf(arr[i]) * 28));
						flag = false;
				 	}
					else if(result.charCodeAt(result.length-1) >= 0xAC00 && result.charCodeAt(result.length-1) <= 0xD7A3) {
						var fin = Hangul.seperateToObject(result[result.length-1])[0].final;
						if(__init__.indexOf(fin)){
							result = result.substr(0,result.length-1) + String.fromCharCode(result.charCodeAt(result.length-1)-__final__.indexOf(fin));
							result += String.fromCharCode(0xAC00 + (__init__.indexOf(fin) * 588) + (__medial__.indexOf(arr[i]) * 28));
							flag = false;
						}
					}
				}
			}
			if(flag) result += arr[i];
		}
		return result;
	}
}
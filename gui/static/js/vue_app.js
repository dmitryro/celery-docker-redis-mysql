new Vue({
  el: "#app",
  data: {
     word_one: null,
     word_two: null,
     w1_errors: [],
     w2_errors: [],
  },
  created: function () {
      $('#anagram').html("");
      $('#anagram').css('display','none');
      console.log("Created new Vue instance");
  },
  methods:{
    read_anagrams: function(e) {
            /* Read all anagrams (1) and display them */
            $.ajax({
                url: 'http://0.0.0.0:5000/readbystate/1',
                type: 'GET',
                crossDomain: true,
                success: function(msg) { 
                    var index;
                    var anagrams = "<div class='anagrams-liar'>";
                    for (index = 0; index < msg.length; ++index) {
                        /* Let us parse the date when a check was done */
                        let dt = new Date(Date.parse(msg[index]['date_checked']));
                        let month = dt.getMonth();
                        let year = dt.getFullYear();
                        let day = dt.getDay();
                        let hours = dt.getHours();
                        let minutes = dt.getMinutes();
                        let result_minutes = minutes;

                        if (minutes < 10) {
                            result_minutes = "0"+minutes;
                        }

                        let date_fmt = year+"-"+month+"-"+day+" "+hours+":"+result_minutes;

                        /* Create a line and display in list of processed anagrams */
                        anagrams += "<div>"+msg[index]['first_word']+" vs "+msg[index]['second_word']+" "+date_fmt+"</div>";
                    }
                    anagrams += "</div>";
                    $('#anagrams').html(anagrams);
                },
                error: function(msg) { alert('Failed!'+msg); }
            });

    },

    read_non_anagrams: function(e) {
            /* Read all non-anagrams (0) and display them */
            $.ajax({
                url: 'http://0.0.0.0:5000/readbystate/0',
                type: 'GET',
                crossDomain: true,
                success: function(msg) { alert(msg.length); 
                    var index;
                    var non_anagrams = "<div class='anagrams-list'>";
                    for (index = 0; index < msg.length; ++index) {
                        /* Let us parse the date when a check was done */
                        let dt = new Date(Date.parse(msg[index]['date_checked']));
                        let month = dt.getMonth();
                        let year = dt.getFullYear();
                        let day = dt.getDay();
                        let hours = dt.getHours();
                        let minutes = dt.getMinutes();
                        let result_minutes = minutes;

                        if (minutes < 10) {
                            result_minutes = "0"+minutes;
                        }
                        
                        let date_fmt = year+"-"+month+"-"+day+" "+hours+":"+result_minutes;

                        /* Create a line and display in list of processed non-anagrams */
                        non_anagrams += "<div>"+msg[index]['first_word']+" vs "+msg[index]['second_word']+" "+date_fmt+"</div>";
                    }
                    non_anagrams += "</div>";
                    $('#non-anagrams').html(non_anagrams);
                },
                error: function(msg) { alert('Failed!'+msg); }
            });

    },

    callapi: function(e) {
        /* The actual API call - first validate, and if valid, call the API */

        this.w1_errors = [];         
        this.w2_errors = [];

        let word1 = this.word_one;
        let word2 = this.word_two;
       
        $('#error-one').html("");
        $('#error-two').html("");

        if(!this.word_one) {
            $('#error-one').html("Invalid word one");
            this.w1_errors.push('Word one required.');
        }

        if (!this.word_two) {
            $('#error-two').html("Invalid word two");
            this.w2_errors.push('Word two required.');
        }

        if (!this.w2_errors.length && !this.w1_errors.length) {

            /* Call the api with two words, and display message based on result */  
            $.ajax({
                url: 'http://0.0.0.0:5000/anagram/'+this.word_one+'/'+this.word_two,
                type: 'GET',
                crossDomain: true,
                success: function(msg) { 
                    if (msg.is_anagram) {
                 
                        $('#anagram').html("The two words "+word1+" and "+word2+" are anagrams. ");
                        $('#anagram').removeClass("error");
                        $('#anagram').addClass("success");
                        $('#anagram').css('display','block').fadeOut(2400);  

                    }  else {
     
                        $('#anagram').html("The two words "+word1+" and "+word2+" are not anagrams. ");
                        $('#anagram').removeClass("success");
                        $('#anagram').addClass("error");
                        $('#anagram').css('display','block').fadeOut(2400);   
                    }

                },
                error: function(msg) { alert('Failed!'+msg); }
            });
            /* Refresh the lists of anagrams and non-anagrams */
            this.read_anagrams();
            this.read_non_anagrams();

            $('#error-one').html("");
            $('#error-two').html("");
            return true;
        }
        return false;   
    }
  },
  ready: function() {
  },
  
});

Vue.config.delimiters = ['[[', ']]'];

Madlibs Revisited

Let's build another program using madlibs. We made a similar program in the Easy exercises,
but this time the requirements are a bit different.

Build a madlibs program that takes a text template as input,
plugs in a selection of randomized nouns, verbs, adjectives, and adverbs into that text,
and then returns it.
You can build your lists of nouns, verbs, adjectives, and adverbs directly into your program.
Your program should read this text and, for each line, place random words of the appropriate types
into the text and return the result.

The challenge of this program isn't just about writing your solution —
it's about choosing the structure of the text template.
Choose the right way to structure your template and this problem becomes much easier.
Consequently, this exercise is a bit more open-ended since the input is also something that you'll be defining.

Examples:

Note: The quotes in the example strings returned by the madlibs function are only shown for emphasis.
These quotes are not present in the actual output strings.
The words in quotes come from the list of texts and it is the madlibs function that puts them in.

function madlibs(template) {
  // ...
}

// These examples use the following list of replacement texts:
adjectives: quick lazy sleepy noisy hungry
nouns: fox dog head leg tail cat
verbs: jumps lifts bites licks pats
adverbs: easily lazily noisily excitedly
------

madlibs(template1);
// The "sleepy" brown "cat" "noisily"
// "licks" the "sleepy" yellow
// "dog", who "lazily" "licks" his
// "tail" and looks around.

madlibs(template1);
// The "hungry" brown "cat" "lazily"
// "licks" the "noisy" yellow
// "dog", who "lazily" "licks" his
// "leg" and looks around.

madlibs(template2);      // The "fox" "bites" the "dog"'s "tail".

madlibs(template2);      // The "cat" "pats" the "cat"'s "head".

rules:
- input, text with placeholders for adjective, noun, verb and adverb.
  - create 2 templates
- have collections of each grammatical category to replace the placeholders
  - arrays within an object

Algo:
- arrays for the word examples
- split and map each word in the template
  - if the word is a category of collection, then replace with random from that category
    - category[Math.random() * category.length]
- join and return mapped array

---------- Solution --------
My solution lacks unique tokens in the text, which was a requirement. 

const EXAMPLES = {
  adjective: ['quick', 'lazy', 'sleepy', 'noisy', 'hungry'],
  noun: ['fox', 'dog', 'head', 'leg', 'tail', 'cat'],
  verb: ['jumps', 'lifts', 'bites', 'licks', 'pats'],
  adverb: ['easily', 'lazily', 'noisily', 'excitedly']
};

function madlibs(template) {
  return template
    .split(' ')
    .map(word => {
      if (Object.keys(EXAMPLES).includes(word)) {
        return EXAMPLES[word][Math.floor(Math.random() * EXAMPLES[word].length)];
      }
      return word;
    })
    .join(' ');
}

const templateOne = `the adjective noun verb adverb whenever it notices
that the adjective noun adverb and adverb verb`;

console.log(madlibs(templateOne));
=> the noisy fox bites easily whenever it notices that the quick tail easily and excitedly lifts

------------- LS Solution ---------

var template1 = 'The ${adjective} brown ${noun} ${adverb} ' +
                '${verb} the ${adjective} yellow ' +
                '${noun}, who ${adverb} ${verb} his ' +
                '${noun} and looks around.';

var template2 = "The ${noun} ${verb} the ${noun}'s ${noun}.";

function madlibs(template) {
  var REPLACEMENT_TEXTS = {
    adjective: ['quick', 'lazy', 'sleepy', 'noisy', 'hungry'],
    noun: ['fox', 'dog', 'head', 'leg', 'tail'],
    verb: ['jumps', 'lifts', 'bites', 'licks', 'pats'],
    adverb: ['easily', 'lazily', 'noisily', 'excitedly'],
  };

  function replaceText(match) {
    var key = match.replace(/[^a-z]/g, '');
    var index = Math.floor(Math.random() * REPLACEMENT_TEXTS[key].length);
    return REPLACEMENT_TEXTS[key][index];
  }

  return template.replace(/\${[a-z]+}/g, replaceText);
}

-------- Discussion --------

For this problem, there are two things to consider: 
(1) the format for the template and 
(2) how to process the template.

For the format, the idea is to come up with an easy way for the function to find "words" or "tokens" in the template, 
and replace them with the corresponding type of content. 
The tokens need to have identifiers denoting their start and end, 
so that the function is able to tell them apart from the rest of the text. 
These identifiers also must be unique enough to prevent the function from mistaking normal text as a token to replace.

For instance, if the template uses double quotes ("") to denote tokens to replace, 
then the following code leads to a bug:

var template1 = 'The "noun" shouted "hello".';
The function will interpret both "noun" and "hello" as words to replace.

Given the potential issue shown above, the solution's approach is to use the token, ${noun}, 
to denote the text to replace. 
The word between the curly braces {} is the type of content the token should be replaced with—in this case, a noun. 
The $ before the curly braces is to make the identifier more unique, 
since there's a chance that the text may contain curly braces used on their own in a typical way
— instead of being used for denoting a token.

The solution processes the template by calling the String.prototype.replace method and 
passing in a regex and a callback function as arguments. 
The regex pattern, /\${[a-z]+}/g, matches each token in the template. 
The text matched by the regex pattern is then passed as an argument to the replaceText callback function. 
The replaceText function processes the matched text to remove any characters used as identifiers 
(in this case, ${}), leaving only the content type. 
The content type is then used as the key to retrieve the appropriate list of words from the REPLACEMENT_TEXTS object. 
The replaceText function generates a random index and uses it to select a word from the list at random.

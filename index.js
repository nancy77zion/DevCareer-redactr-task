// Add event listener to the form submission
document.getElementById('myForm').addEventListener('submit', (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();
  // Call the function when the form is submitted
  redactedContent();
});

// Add event listener to the reset button
document.getElementById('resetBtn').addEventListener('click', () => {
  // Call the function when the reset button is clicked
  reset();
});

// Defined redactedContent function
const redactedContent = () => {
  // Get the content, words to redact, and replacement character from the form
  const content = document.getElementById('content').value;
  const redact_words = document.getElementById('redact_words').value.trim().split(' ');
  const replaced_words = document.getElementById('replaced_words').value;

  // Redact the content based on the inputed words and replacement 
  const redact_Content = input_text(content, redact_words, replaced_words);
  console.log(redact_Content);

  // Display the redacted content
  document.getElementById('show_redacted_text').textContent = redact_Content;

  // Calculate and display statistics about the redaction 
  const inpt_words_counted = content.split(/\s+/).length;
  const input_word_redacted = redact_words.length;
  const input_char_redacted = redact_Content.length - content.length;

  // Update the corresponding elements with the calculated statistics
  document.getElementById('word_count').textContent = inpt_words_counted;
  document.getElementById('word_redacted').textContent = input_word_redacted;
  document.getElementById('char_redacted').textContent = input_char_redacted;
}

// Define reset function
const reset = () => {
  // Reset the values of the form input fields and other elements to their default values
  document.getElementById('show_redacted_text').textContent = '';
  document.getElementById('content').value = '';
  document.getElementById('redact_words').value = '';
  document.getElementById('replaced_words').value = '****';
  document.getElementById('word_count').textContent = '0';
  document.getElementById('word_redacted').textContent = '0';
  document.getElementById('char_redacted').textContent = '0';
}

// Define function
const input_text = (content, input_word, replacement) => {
  // Iterate over each word to redact
  input_word.forEach((word) => {
      // Create a regular expression to find all occurrences of the word in the content (case-insensitive)
      const regex = new RegExp(word ,'gi');
      // Replace each occurrence of the word with the specified replacement repeated the same number of times as the length of the word
      content = content.replace(regex, replacement.repeat(word.length));
  });

  // Return the redacted content
  return content;
}

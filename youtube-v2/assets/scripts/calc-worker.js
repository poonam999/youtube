console.log('Inside the Calc Worker');

// Let's now receive the message from main.js 
onmessage = function(event) {
  console.log(event.data);
  const multipliedOutput = event.data[0] * event.data[1];
  console.log(multipliedOutput);

  const workerResult = 'Result: ' + multipliedOutput;
  console.log('Worker: Posting message back to the main script which is running on windows scope');
  postMessage(workerResult);
}
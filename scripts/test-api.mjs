import http from 'http';

http.get('http://localhost:4321/api/foods/search?q=banana', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('RESPONSE:', data));
});

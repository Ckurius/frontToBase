import React, { useState } from 'react';

const Inout = () => {
  const [selectedCommand, setSelectedCommand] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
  });

  const handleCommandChange = (event) => {
    setSelectedCommand(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      selectedCommand === 'POST' &&
      formData.title &&
      formData.author &&
      formData.content
    ) {
      try {
        const jsonData = JSON.stringify(formData);
        console.log(jsonData);
        const contentLength = jsonData.length;
        console.log(contentLength);

        const response = await fetch('http://localhost:3000/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            HOST: 'localhost:3000',
            'Content-Length': contentLength,
          },
          body: jsonData,
        });
        console.log('fetch abgeschlossen');
        const data = await response.json();
        console.log('Response:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('Bitte alle Felder ausfüllen.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          PostgreSQL Connector
        </h1>
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center space-x-4 justify-center">
            <label
              htmlFor="command"
              className="text-lg font-medium text-gray-700"
            >
              Methode:
            </label>
            <select
              id="command"
              name="command"
              value={selectedCommand}
              onChange={handleCommandChange}
              className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Bitte wählen</option>
              <option value="POST">POST</option>
              <option value="GET">GET</option>
              <option value="DELETE">DELETE</option>
              <option value="UPDATE">UPDATE</option>
            </select>
          </div>

          {selectedCommand === 'POST' && (
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Titel"
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Author"
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Content"
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Inout;

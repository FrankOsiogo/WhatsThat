import { getUserToken } from './Utility/UserStorage';

//User Management----------------------------------------------------------------------------------------------//
export function register(firstName, lastName, email, password) {
    return fetch('http://localhost:3333/api/1.0.0/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }
  
  export function loginUser(email, password) {
    return fetch('http://localhost:3333/api/1.0.0/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message);
          });
        }
        return response.json();
      })
    }
  
    export async function getContacts() {
        const authToken = await getUserToken();
        return fetch('http://localhost:3333/api/1.0.0/contacts', {
          method: 'GET',
          headers: {
            'X-Authorization': authToken,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (!response.ok) {
              if (response.status === 401) {
                throw new Error('Unauthorized');
              } else {
                throw new Error('Server Error');
              }
            }
            return response.json();
          })
          .then((data) => {
            return data;
          })
          .catch((error) => {
            throw error;
          });
      }
      

      export async function getUserById(userId) {
        const authToken = await getUserToken();
        return fetch(`http://localhost:3333/api/1.0.0/user/${userId}`, {
          method: 'GET',
          headers: {
            'X-Authorization': authToken,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (!response.ok) {
              if (response.status === 401) {
                throw new Error('Unauthorized');
              } else if (response.status === 404) {
                throw new Error('Not Found');
              } else {
                throw new Error('Server Error');
              }
            }
            return response.json();
          })
          .then((data) => {
            return data;
          })
          .catch((error) => {
            throw error;
          });
      }

      //Contacts Management-----------------------------------------------------------------------------------//
      export async function addUserAsContact(user_id) {
        const authToken = await getUserToken();
        return fetch(`http://localhost:3333/api/1.0.0/user/${user_id}/contact`, {
          method: 'POST',
          headers: {
            'X-Authorization': authToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        })
          .then((response) => {
            if (!response.ok) {
              if (response.status === 400) {
                throw new Error("You can't add yourself as a contact");
              } else if (response.status === 401) {
                throw new Error('Unauthorized');
              } else if (response.status === 404) {
                throw new Error('Not Found');
              } else if (response.status === 409) {
                throw new Error('Already a contact');
              } else {
                throw new Error('Server Error');
              }
            }
            return response.json().then((data) => {
              return {
                status: response.status,
                data: data,
              };
            });
          })
          .catch((error) => {
            throw error;
          });
      }

      export async function removeUserFromContacts(userId) {
        const authToken = await getUserToken();
        return fetch(`http://localhost:3333/api/1.0.0/user/${userId}/contact`, {
          method: 'DELETE',
          headers: {
            'X-Authorization': authToken,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (!response.ok) {
              if (response.status === 400) {
                throw new Error("You can't remove yourself as a contact");
              } else if (response.status === 401) {
                throw new Error('Unauthorized');
              } else if (response.status === 404) {
                throw new Error('Not Found');
              } else {
                throw new Error('Server Error');
              }
            }
            return response;
          })
          .catch((error) => {
            throw error;
          });
      }

      
      export const searchUsers = async (searchTerm, limit = 20, offset = 0) => {
        try {
          const authToken = await getUserToken(); // Retrieve the user token
          const response = await fetch(`http://localhost:3333/api/1.0.0/search?q=${searchTerm}&limit=${limit}&offset=${offset}`, {
            method: 'GET',
            headers: {
              'X-Authorization': authToken,
              'Content-Type': 'application/json',
            },
          });
      
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
          throw error;
        }
      };
      
      export async function getBlockedUsers() {
        const authToken = await getUserToken();
        return fetch('http://localhost:3333/api/1.0.0/blocked', {
          method: 'GET',
          headers: {
            'X-Authorization': authToken,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (!response.ok) {
              if (response.status === 401) {
                throw new Error('Unauthorized');
              } else if (response.status === 500) {
                throw new Error('Server Error');
              } else {
                throw new Error('Unknown Error');
              }
            }
            return response.json();
          })
          .then((data) => {
            return data;
          })
          .catch((error) => {
            throw error;
          });
      }
      
      export async function blockUser(userId) {
        const authToken = await getUserToken();
        return fetch(`http://localhost:3333/api/1.0.0/user/${userId}/block`, {
          method: 'POST',
          headers: {
            'X-Authorization': authToken,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (!response.ok) {
              if (response.status === 400) {
                throw new Error("You can't block yourself");
              } else if (response.status === 401) {
                throw new Error('Unauthorized');
              } else if (response.status === 404) {
                throw new Error('Not Found');
              } else if (response.status === 500) {
                throw new Error('Server Error');
              } else {
                throw new Error('Unknown Error');
              }
            }
            return response;
          })
          .catch((error) => {
            throw error;
          });
      }
      
      export async function unblockUser(userId) {
        const authToken = await getUserToken();
        return fetch(`http://localhost:3333/api/1.0.0/user/${userId}/block`, {
          method: 'DELETE',
          headers: {
            'X-Authorization': authToken,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (!response.ok) {
              if (response.status === 400) {
                throw new Error("You can't unblock yourself");
              } else if (response.status === 401) {
                throw new Error('Unauthorized');
              } else if (response.status === 404) {
                throw new Error('Not Found');
              } else if (response.status === 500) {
                throw new Error('Server Error');
              } else {
                throw new Error('Unknown Error');
              }
            }
            return response;
          })
          .catch((error) => {
            throw error;
          });
      }

      export async function updateUser(userId, updatedUser) {
        const authToken = await getUserToken();
        return fetch(`http://localhost:3333/api/1.0.0/user/${userId}`, {
          method: 'PATCH',
          headers: {
            'X-Authorization': authToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        })
          .then((response) => {
            if (!response.ok) {
              if (response.status === 400) {
                throw new Error('Bad request');
              } else if (response.status === 401) {
                throw new Error('Unauthorized');
              } else if (response.status === 403) {
                throw new Error('Forbidden');
              } else if (response.status === 404) {
                throw new Error('Not Found');
              } else {
                throw new Error('Server Error');
              }
            }
            return response;
          })
          .catch((error) => {
            throw error;
          });
      }

      //Chat Management--------------------------------------------------------------------------------------//

      export async function createConversation(name) {
        const authToken = await getUserToken();
        return fetch('http://localhost:3333/api/1.0.0/chat', {
          method: 'POST',
          headers: {
            'X-Authorization': authToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
          }),
        })
          .then((response) => {
            if (response.status === 201) {
              return response.json();
            } else if (response.status === 400) {
              throw new Error('Bad request');
            } else if (response.status === 401) {
              throw new Error('Unauthorized');
            } else {
              throw new Error('Server Error');
            }
          })
          .then((data) => {
            return data;
          })
          .catch((error) => {
            throw error;
          });
      }
      
      export async  function getChats() {
        const authToken = await getUserToken();
        return fetch('http://localhost:3333/api/1.0.0/chat', {
          method: 'GET',
          headers: {
            'X-Authorization': authToken,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else if (response.status === 401) {
              throw new Error('Unauthorized');
            } else {
              throw new Error('Server Error');
            }
          })
          .then((data) => {
            return data;
          })
          .catch((error) => {
            throw error;
          });
      }

      export async function getChatDetails(chatId) {
        const authToken = await getUserToken();
        return fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}`, {
          method: 'GET',
          headers: {
            'X-Authorization': authToken,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else if (response.status === 401) {
              throw new Error('Unauthorized');
            } else if (response.status === 403) {
              throw new Error('Forbidden');
            } else if (response.status === 404) {
              throw new Error('Not Found');
            } else {
              throw new Error('Server Error');
            }
          })
          .then((data) => {
            return data;
          })
          .catch((error) => {
            throw error;
          });
      }
      
      export async function updateChat(chatId, chatData) {
        const authToken = await getUserToken();
        return fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}`, {
          method: 'PATCH',
          headers: {
            'X-Authorization': authToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(chatData),
        })
          .then((response) => {
            if (response.status === 200) {
            } else if (response.status === 400) {
              throw new Error('Bad request');
            } else if (response.status === 401) {
              throw new Error('Unauthorized');
            } else if (response.status === 403) {
              throw new Error('Forbidden');
            } else if (response.status === 404) {
              throw new Error('Not Found');
            } else {
              throw new Error('Server Error');
            }
          })
          .catch((error) => {
            throw error;
          });
      }

      export async function addUserToChat(chatId, userId) {
        const authToken = await getUserToken();
        return fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}/user/${userId}`, {
          method: 'POST',
          headers: {
            'X-Authorization': authToken,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response.status === 200) {
            } else if (response.status === 400) {
              throw new Error('Bad Request');
            } else if (response.status === 401) {
              throw new Error('Unauthorized');
            } else if (response.status === 403) {
              throw new Error('Forbidden');
            } else if (response.status === 404) {
              throw new Error('Not Found');
            } else {
              throw new Error('Server Error');
            }
          })
          .catch((error) => {
            throw error;
          });
      }

      export async function removeUserFromChat(chatId, userId) {
        const authToken = await getUserToken();
        return fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}/user/${userId}`, {
          method: 'DELETE',
          headers: {
            'X-Authorization': authToken,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response.status === 200) {
            } else if (response.status === 401) {
              throw new Error('Unauthorized');
            } else if (response.status === 403) {
              throw new Error('Forbidden');
            } else if (response.status === 404) {
              throw new Error('Not Found');
            } else {
              throw new Error('Server Error');
            }
          })
          .catch((error) => {
            throw error;
          });
      }

      export async function addMessageToChat(chatId, message) {
        const authToken = await getUserToken();
        return fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}/message`, {
          method: 'POST',
          headers: {
            'X-Authorization': authToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: message,
          }),
        })
          .then((response) => {
            if (response.status === 200) {
              // Handle successful addition, if needed
            } else if (response.status === 400) {
              throw new Error('Bad Request');
            } else if (response.status === 401) {
              throw new Error('Unauthorized');
            } else if (response.status === 403) {
              throw new Error('Forbidden');
            } else if (response.status === 404) {
              throw new Error('Not Found');
            } else {
              throw new Error('Server Error');
            }
          })
          .catch((error) => {
            throw error;
          });
      }
      
      export async function updateMessageInChat(chatId, messageId, updatedMessage) {
        const authToken = await getUserToken();
        return fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}/message/${messageId}`, {
          method: 'PATCH',
          headers: {
            'X-Authorization': authToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: updatedMessage,
          }),
        })
          .then((response) => {
            if (response.status === 200) {
              // Handle successful update, if needed
            } else if (response.status === 400) {
              throw new Error('Bad Request');
            } else if (response.status === 401) {
              throw new Error('Unauthorized');
            } else if (response.status === 403) {
              throw new Error('Forbidden');
            } else if (response.status === 404) {
              throw new Error('Not Found');
            } else {
              throw new Error('Server Error');
            }
          })
          .catch((error) => {
            throw error;
          });
      }
      
      export async function deleteMessageFromChat(chatId, messageId) {
        const authToken = await getUserToken();
        return fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}/message/${messageId}`, {
          method: 'DELETE',
          headers: {
            'X-Authorization': authToken,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response.status === 200) {
              // Handle successful deletion, if needed
            } else if (response.status === 401) {
              throw new Error('Unauthorized');
            } else if (response.status === 403) {
              throw new Error('Forbidden');
            } else if (response.status === 404) {
              throw new Error('Not Found');
            } else {
              throw new Error('Server Error');
            }
          })
          .catch((error) => {
            throw error;
          });
      }
      
      
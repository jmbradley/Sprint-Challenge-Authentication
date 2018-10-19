<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
 Sessions allows us to save data that helps us identify a user and match that data to a session ID (meaning an ID that is unique to that instance of interaction with the person who has logged in)

2. What does bcrypt do to help us store passwords in a secure manner.
Bcrypt encrypts passwords through a process of hashing. At it's core bcrypt is just a hashing alogo, but in practice it allows us to intake plain text and convert it to a hashed state so that we can then safely publically handle.

3. What does bcrypt do to slow down attackers?
It adds magnitudes of order of complexity to the cracking process. A password that would take 10 secs to crack can become a password that can take millenia to crack.

4. What are the three parts of the JSON Web Token?
Header, Payload and Signature

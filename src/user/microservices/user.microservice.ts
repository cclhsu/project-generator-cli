// import { Injectable, Logger } from '@nestjs/common';
// import axios from 'axios';

// @Injectable()
// export class UserMicroservice {
//   private readonly remoteBaseUrl = 'https://api.example.com'; // Replace with your remote microservice URL

//   async getUsers(token: string): Promise<UserResponse[]> {
//     try {
//       const response = await axios.get<UserResponse[]>(
//         `${this.remoteBaseUrl}/users`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       return response.data;
//     } catch (error: any) {
//       throw new Error('Failed to fetch users from the remote microservice.');
//     }
//   }

//   async getUserByUuid(UUID: string, token: string): Promise<UserResponse> {
//     try {
//       const response = await axios.get<UserResponse>(
//         `${this.remoteBaseUrl}/users/${uuid}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       return response.data;
//     } catch (error: any) {
//       throw new Error(
//         'Failed to fetch user by UUID from the remote microservice.',
//       );
//     }
//   }

//   async createUser(
//     token: string,
//     user: CreateUserRequest,
//   ): Promise<UserResponse> {
//     try {
//       const response = await axios.post<UserResponse>(
//         `${this.remoteBaseUrl}/users`,
//         user,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       return response.data;
//     } catch (error: any) {
//       throw new Error('Failed to create user via the remote microservice.');
//     }
//   }

//   async updateUser(
//     UUID: string,
//     token: string,
//     user: UpdateUserRequest,
//   ): Promise<UserResponse> {
//     try {
//       const response = await axios.put<UserResponse>(
//         `${this.remoteBaseUrl}/users/${uuid}`,
//         user,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       return response.data;
//     } catch (error: any) {
//       throw new Error('Failed to update user via the remote microservice.');
//     }
//   }

//   async deleteUser(UUID: string, token: string): Promise<UserResponse> {
//     try {
//       const response = await axios.delete<UserResponse>(
//         `${this.remoteBaseUrl}/users/${uuid}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       return response.data;
//     } catch (error: any) {
//       throw new Error('Failed to delete user via the remote microservice.');
//     }
//   }

//   async getUserByUsername(
//     username: string,
//     token: string,
//   ): Promise<UserResponse> {
//     try {
//       const response = await axios.get<UserResponse>(
//         `${this.remoteBaseUrl}/users/usernames/${username}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       return response.data;
//     } catch (error: any) {
//       throw new Error(
//         'Failed to fetch user by username from the remote microservice.',
//       );
//     }
//   }

//   async getUserByEmail(email: string, token: string): Promise<UserResponse> {
//     try {
//       const response = await axios.get<UserResponse>(
//         `${this.remoteBaseUrl}/users/emails/${email}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       return response.data;
//     } catch (error: any) {
//       throw new Error(
//         'Failed to fetch user by email from the remote microservice.',
//       );
//     }
//   }
// }

import axios from "axios";

export async function getGithubAvatar(username: string): Promise<string> {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data.avatar_url;

  } catch (error) {
    return "teste"; 
  }
}

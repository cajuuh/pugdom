import axios from "axios";
import { InstanceInfo } from "../components/interfaces";

export const getInstanceInfo = async (
  apiBaseUrl: string
): Promise<InstanceInfo> => {
  try {
    const response = await axios.get<InstanceInfo>(
      `${apiBaseUrl}/api/v2/instance`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching instance information:", error);
    throw new Error("Unable to fetch instance information.");
  }
};

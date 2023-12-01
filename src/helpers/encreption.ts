import bcrypt from "bcrypt";

// encoding password function
export const encryptPassword = (password: string) => {
  const hashedPassword = bcrypt.hash(password, 10);
  console.log(hashedPassword);

  return hashedPassword;
};

// decoding passwod function
export const decryptPassword = async (
  hashedPassword: string,
  password: string
) => {
  try {
    if (!password || !hashedPassword) {
      console.error(
        "Invalid arguments. Password and hashed password are required."
      );
      throw new Error("Invalid arguments");
    }
    const result = await bcrypt.compare(password, hashedPassword);
    console.log("Comparison result:", result);

    return result;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw new Error("Error comparing passwords");
  }
};

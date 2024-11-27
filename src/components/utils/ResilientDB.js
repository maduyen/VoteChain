export const fetchTransactionDetails = async (transactionId) => {
    try {
      const response = await fetch("https://cloud.resilientdb.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query {
              getTransaction(id: "${transactionId}") {
                id
                publicKey
                signerPublicKey
              }
            }
          `,
        }),
      });
  
      const result = await response.json();
  
      if (result.data && result.data.getTransaction) {
        return result.data.getTransaction;
      } else {
        throw new Error("Transaction details not found.");
      }
    } catch (error) {
      console.error("Error fetching transaction details:", error);
      throw error;
    }
  };
  
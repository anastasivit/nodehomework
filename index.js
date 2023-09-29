const { program } = require("commander");
const contacts = require("./contacts");

program.version("1.0.0").description("Contact Management System");

program
  .option("-a, --action <type>", "Action: list, get, add, or remove")
  .option("-i, --id <type>", "Contact ID")
  .option("-n, --name <type>", "Name of the contact")
  .option("-e, --email <type>", "Email of the contact")
  .option("-p, --phone <type>", "Phone number of the contact");

program.parse(process.argv);

const options = program.opts();

async function main() {
  try {
    const { action, id, name, email, phone } = options;

    switch (action) {
      case "list":
        const allContacts = await contacts.listContacts();
        console.table(allContacts);
        break;

      case "get":
        const contactById = await contacts.getContactById(id);
        console.log("Contact by ID:", contactById);
        break;

      case "add":
        const newContact = await contacts.addContact(name, email, phone);
        console.log("New Contact:", newContact);
        break;

      case "remove":
        const removedContact = await contacts.removeContact(id);
        console.log("Removed Contact:", removedContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();

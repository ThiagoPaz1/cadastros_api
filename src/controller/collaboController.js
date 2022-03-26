const queries = require('../model/queries');

const validGetCollaborator = async (req, res, next) => {
  const { name } = req.params;
  const message = "É necessário passar uma nome de coloborador como  parâmetro";
  const findByName = await queries.findByName(name);

  if (Boolean(name) == false) {
    return res.status(400).json(message);
  }

  if (findByName.length == 0) {
    return res.status(400).json({message: "Nome de coloborador não encontrado"});
  }

  next();
}

const resGetCollaborator = async (req, res) => {
  const { name } = req.params;

  try {
    const collaborator = await queries.findByNameAll(name);

    return res.status(200).json(collaborator);
  } catch (error) {
    return res.status(400).send(error);
  }
}

const validSectors = async (req, res, next) => {
  const { id } = req.params;
  const message = "É necessário passar uma nome de coloborador como  parâmetro";
  const sectors = await queries.findBySectors(id);  

  if (Boolean(id) == false) {
    return res.status(400).json(message);
  }

  if (sectors.length == 0) {
    return res.status(400).json({message: "Id de setor não encontrado"});
  }

  next();
}

const resSectors = async (req, res) => {
  const { id } = req.params;
  const sectors = await queries.findBySectors(id);
  const getAllCollaborators = await queries.getAll();
  const filterCollabotors = getAllCollaborators.filter(element => element.setor_id == sectors[0].id);
  const collabotorsBySector = filterCollabotors.map(element => {
    return {nome: element.name, email: element.email}
  });
  
  try {
    return res.status(200).json(collabotorsBySector);
  } catch (error) {
    return res.status(400).send(error);
  }
}

const validBodyAdd = async (req, res, next) => {
  const { name, email, telefone, cpf, setor_id } = req.body;
  const arr = [name, email, telefone, cpf, setor_id];

  const findByName = await queries.findByName(name);
  const findByEmail = await queries.findByEmail(email);
  const findBycpf = await queries.findBycpf(cpf);
  const findByTelefone = await queries.findByTelefone(telefone);
  
  if (findByName.length != 0) {
    return res.status(400).json({message: "Nome já cadastrado"});
  }

  if (findByEmail.length != 0) {
    return res.status(400).json({message: "Email já cadastrado"});
  }

  if (findBycpf.length != 0) {
    return res.status(400).json({message: "CPF já cadastrado"});
  }

  if (findByTelefone.length != 0) {
    return res.status(400).json({message: "Telefone já cadastrado"});
  }

  for (let i in arr) {
    const  checkStr = arr[i] == '' || arr[i] == ' ';
    let checkBool = Boolean(arr[i]) == false;

    if (checkStr || checkBool) {
      return res.status(400).json({message: " Todos os campos devem esta preenchidos."});
    }
  }

  next();
}

const addResponse = async (req, res) => {
  const { name, email, telefone, cpf, setor_id } = req.body;

  try {
    await queries.add(name, email, telefone, cpf, setor_id);

    return res.status(201).json({message: "Cadastro realizado com sucesso."});
  } catch (error) {
    return res.status(400).send(error);
  }
}

const validId = async (req, res, next) => {
  const { id } = req.params;
  const message = "É necessário passar uma nome de coloborador como  parâmetro";
  const findById = await queries.findById(id);

  if (Boolean(id) == false) {
    return res.status(400).json(message);
  }

  if (findById.length == 0) {
    return res.status(400).json({message: "Id de coloborador não encontrado"});
  }

  next();
}

const resRemoveCollaborator = async (req, res) => {
  const { id } = req.params;

  try {
    await queries.remove(id);

    return res.status(200).json({message: "Cadastro removido com sucesso."});
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = {
  validSectors,
  resSectors,
  validBodyAdd,
  addResponse,
  validGetCollaborator,
  resGetCollaborator,
  validId,
  resRemoveCollaborator,
}
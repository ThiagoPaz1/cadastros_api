const connection = require('./dbConnection');

const getAll = async () => {
  const query = 'SELECT * FROM crud.colaboradores'
  const [getAllFound]  = await connection.execute(query);

  return getAllFound;
}

const findByName = async (name) => {
  const query = 'SELECT name FROM crud.colaboradores WHERE name = ?'
  const [nameFound]  = await connection.execute(query, [name]);

  return nameFound;
}

const findByEmail = async (email) => {
  const query = 'SELECT email FROM crud.colaboradores WHERE email = ?'
  const [ emailFound ] = await connection.execute(query, [email]);

  return emailFound;
};

const findBycpf = async (cpf) => {
  const query = 'SELECT cpf FROM crud.colaboradores WHERE cpf = ?'
  const [ cpfFound ] = await connection.execute(query, [cpf]);

  return cpfFound;
};

const findByTelefone = async (telefone) => {
  const query = 'SELECT telefone FROM crud.colaboradores WHERE telefone = ?'
  const [ telefoneFound ] = await connection.execute(query, [telefone]);

  return telefoneFound;
};

const add = async (name, email, telefone, cpf, setor_id) => {
  const query = 'INSERT INTO crud.colaboradores (name, email, telefone, cpf, setor_id) VALUES (?, ?, ?, ?, ?)';
  
  return await connection.execute(query, [name, email, telefone, cpf, setor_id]);
}

const findById = async (id) => {
  const query = 'SELECT * FROM crud.colaboradores WHERE id = ?';
  const [idFound]  = await connection.execute(query, [id]);

  return idFound;
}

const findBySectors = async (id) => {
  const query = 'SELECT * FROM crud.setores WHERE id = ?';
  const [sectorFound]  = await connection.execute(query, [id]);

  return sectorFound;
}

const findByNameAll = async (name) => {
  const query = 'SELECT * FROM crud.colaboradores WHERE name = ?'
  const [nameFound]  = await connection.execute(query, [name]);

  return nameFound;
}

const remove = async (id) => {
  const query = 'DELETE FROM crud.colaboradores WHERE id = ?'
  
  return await connection.execute(query, [id]);
}


module.exports = {
  getAll,
  findById,
  findBySectors,
  findByName,
  findByNameAll,
  findByEmail,
  findBycpf,
  findByTelefone,
  add,
  remove,
}
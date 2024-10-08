const Notes = require('../models/notes'); // Importa o modelo 'Notes' do arquivo de modelos


// Criar um novo Note
exports.criarNotes = async (req, res) => {
    console.log('esta chegando no metodo corretamente')
    // Cria uma nova instância do modelo 'Note' com os dados recebidos na requisição
    const notes = new Notes({
        Nome_da_Anotacao: req.body.Nome_da_Anotacao,   // Nome do Note
        Data: req.body.Data,  // Data do Note 
        Anotacao: req.body.Anotacao   // Detalhes do Note
       
    });
    try {
        // Salva o novo Note no banco de dados
        const novaNote = await notes.save();
        // Retorna o Note criado com status 201 (Criado)
        res.status(201).json(novaNote);
    } catch (err) {
        // Em caso de erro, retorna uma mensagem de erro com status 400 (Bad Request)
        res.status(400).json({ message: err.message }); 
        console.error(err) 

    }
};


// Listar todos os Notes
exports.listarNotes = async (req, res) => {
    try {
        
        // Busca todos os Notes no banco de dados
        const notes = await Notes.find();
        // Retorna a lista de Notes
        res.json(notes);
    } catch (err) {
        // Em caso de erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
        res.status(500).json({ message: err.message });
    }
};



// Atualizar um Note por ID
exports.atualizarNotes = async (req, res) => {
    try {
        // Busca o Note pelo ID
        const note = await Notes.findById(req.params.id);
        if (note == null) {
            // Se o Note não for encontrado, retorna status 404 (Não Encontrado)
            return res.status(404).json({ message: 'Nota não encontrada' });
        }


        // Verifica quais campos foram enviados na requisição e os atualiza
        if (req.body.Nome_da_Anotacao != null) {
            note.Nome_da_Anotacao = req.body.Nome_da_Anotacao;
            console.log("teste1");
        }
        if (req.body.Data != null) {
            note.Data = req.body.Data;
            console.log("teste2");
        }


        // Salva o Note atualizado no banco de dados
        const noteAtualizado = await note.save();
        console.log("teste3");
        // Retorna o Note atualizado
        res.json(noteAtualizado);
    } catch (err) {
        // Em caso de erro, retorna uma mensagem de erro com status 400 (Bad Request)
        res.status(400).json({ message: err.message });
    }
};


// Deletar um Note por ID
exports.deletarNotes = async (req, res) => {
    try {
        // Busca o Note pelo ID
        const note = await Notes.findById(req.params.id);
        if (note == null) {
            // Se o Note não for encontrado, retorna status 404 (Não Encontrado)
            return res.status(404).json({ message: 'Note não encontrada' });
        }


        // Remove o Note do banco de dados
        await note.deleteOne();
        // Retorna uma mensagem de sucesso
        res.json({ message: 'Note deletada com sucesso' });
    } catch (err) {
        // Em caso de erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
        res.status(500).json({ message: err.message });
    } 
};

    // Obter detalhes de uma nota por ID
exports.mostrarDetalhes = async (req, res) => {
    try {
        // Busca a nota pelo ID
        const note = await Notes.findById(req.params.id);
        if (note == null) {
            // Se a nota não for encontrada, retorna status 404 (Não Encontrado)
            return res.status(404).json({ message: 'Nota não encontrada' });
        }

        // Retorna a nota encontrada
        res.json(note);
    } catch (err) {
        // Em caso de erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
        res.status(500).json({ message: err.message });
    }
};




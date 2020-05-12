const mongoclient = require('mongodb').MongoClient;
const chalk = require('chalk');

console.log(chalk.green('Iniciando'));
const uri = "mongodb+srv://admin:tute3251@dechangas-31xyj.mongodb.net/test?retryWrites=true&w=majority";

const client = new mongoclient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const newInventors = [
    { firts: "Blaise", last: "Pascal", year: 1981 }, //Lo elimino
    { firts: "Richard", last: "Arkwright", year: 1981 }]; //Luego lo modifico por "Sir Richard"


client.connect((err, result) => {

    if (!err) {

        console.log(chalk.blue('Cliente conectado - ' + fechaHoy()));
        const collection = result.db("sample_betp2").collection("inventors");


        function getListInventors(qtyRegistros) {
            console.log(chalk.yellowBright('getListInventors - ' + fechaHoy()));
            return new Promise((resolve, reject) => {
                resolve(collection.find().limit(qtyRegistros).toArray());
                //reject('No se pudo recuperar lista.');
                console.log(chalk.yellowBright('Fin getListInventors  - ' + fechaHoy()));
            });
        };



        function setNewInventor(iventors) {
            console.log(chalk.yellowBright('setInventor - ' + fechaHoy()));
            return new Promise((resolve, reject) => {
                if (collection.insertMany(newInventors)) {
                    resolve('Iventor ingresado correctamente! ');
                } else (
                    reject('no se pudo insertar registros.')
                );
                console.log(chalk.yellowBright('Fin setNewInventor - ' + fechaHoy()));
            });
        };


        function setDeleteInventor(last) {
            console.log(chalk.yellowBright('SetDeleteInventor - ' + fechaHoy()));
            return new Promise((resolve, reject) => {
                if (collection.deleteOne({ last: last })) 
                { resolve('Iventor eliminado! ' ) }
                else {
                    reject('Error al eliminar registro.');
                };

                console.log(chalk.yellowBright('Fin setDeleteInventor - ' + fechaHoy()));
            }
            );
        };


        function setUpdateIventor(last) {
            console.log(chalk.yellowBright('setUpdateIventor - ' + fechaHoy()));
            return new Promise((resolve, reject) => {
                if (collection.updateOne({ last: last }, { $set: { firts: "Sir Richard" } }))
                {
                    resolve('Iventor Actualizado! ');
                }else {
                    reject('Error al actualizar inventor');
                }
                console.log(chalk.yellowBright('Fin setUpdateIventor - ' + fechaHoy()));
            }
            );
        };



        setNewInventor(newInventors)
        .then((r) => {
            console.log(chalk.greenBright("Result setNewInventor - " + fechaHoy() + " : ", r));
            setDeleteInventor("Pascal")
        .then((r) => {
            console.log(chalk.greenBright("Result setDeleteInventor - " + fechaHoy() + " : ", r));
            setUpdateIventor("Arkwright")
        .then((r) => {
            console.log(chalk.greenBright("Result setUpdateIventor - " + fechaHoy() + " : ", r));
            getListInventors(20)
        .then((r) => {
                    console.log(chalk.greenBright("Result getListInventors - " + fechaHoy() + " : "), r);
                })

            })
        .catch(erro => {
            console.log(chalk.redBright("Result setUpdateIventor - " + fechaHoy() + " : ", erro));
                });

        })
        .catch(erro => {
                    console.log(chalk.redBright("setDeleteInventor - " + fechaHoy() + " : ", erro));
                });
        })
        .catch(erro => {
            console.log(chalk.redBright("newInventors - " + fechaHoy() + " : ", erro));
        })


    } else {
        console.log(chalk.red(err));
    }


});

function fechaHoy() 
{
    let fecha= new Date()
    let horas= fecha.getHours()
    let minutos = fecha.getMinutes()
    let segundos = fecha.getSeconds()
    let milisegundos = fecha.getMilliseconds()
     
    return ( horas + ":" + minutos + ":" + segundos + ":" + milisegundos );
}
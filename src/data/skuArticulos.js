const skuArticulos = [
    { id_sku: '001001001', id_articulo: '1', variacion: 'Amarillo - One Size' },
    { id_sku: '001001002', id_articulo: '1', variacion: 'Azul - One Size' },
    { id_sku: '001001003', id_articulo: '1', variacion: 'Rojo - One Size' },
    { id_sku: '001001004', id_articulo: '1', variacion: 'Fucsia - One Size' },
    { id_sku: '004006005', id_articulo: '2', variacion: 'Verde' },
    { id_sku: '004006006', id_articulo: '2', variacion: 'Azul' },
    { id_sku: '004006007', id_articulo: '2', variacion: 'Rojo' },
    { id_sku: '004006008', id_articulo: '2', variacion: 'Naranjo' },
    { id_sku: '001003009', id_articulo: '3', variacion: 'Mediana' },
    { id_sku: '0010040010', id_articulo: '4', variacion: 'Azul - Mediana - 3D Oso' },
    { id_sku: '0010040011', id_articulo: '4', variacion: 'Gris - Mediana - 3D Dinosaurio' },
    { id_sku: '0010040012', id_articulo: '4', variacion: 'Amarillo - Mediana - 3D Girafa' },
    { id_sku: '0010040013', id_articulo: '5', variacion: 'Azul - Mediana - Para niño' },
    { id_sku: '0010040014', id_articulo: '5', variacion: 'Rosada - Mediana - Para niña' },
    { id_sku: '0010040015', id_articulo: '6', variacion: 'Negra - Grande' },
    { id_sku: '0010050016', id_articulo: '7', variacion: 'Transparente - Mediano' },
    { id_sku: '0040060017', id_articulo: '8', variacion: ' Laberinto 1' },
    { id_sku: '0040060018', id_articulo: '8', variacion: ' Laberinto 2' },
    { id_sku: '0040060019', id_articulo: '8', variacion: ' Laberinto 3' },
    { id_sku: '0040060020', id_articulo: '8', variacion: ' Laberinto 4' },
    { id_sku: '0020070021', id_articulo: '9', variacion: 'Naranjo' },
    { id_sku: '0020070022', id_articulo: '10', variacion: 'Azul' },
    { id_sku: '0020070023', id_articulo: '11', variacion: 'Verde' },
    { id_sku: '0020080024', id_articulo: '12', variacion: 'Blanca con diseño' },
    { id_sku: '0020090025', id_articulo: '13', variacion: 'Blanco con diseño - One Size' },
    { id_sku: '0010050026', id_articulo: '14', variacion: 'Transparente - Mediana' },
    { id_sku: '0040060027', id_articulo: '15', variacion: 'Primeras letras' },
    { id_sku: '0040060028', id_articulo: '16', variacion: 'Primeras palabras' },
    { id_sku: '0040060029', id_articulo: '17', variacion: 'Primeros animales' },
    { id_sku: '0010020030', id_articulo: '18', variacion: 'Mandalas' },
    { id_sku: '0040060031', id_articulo: '19', variacion: 'Fish' },
    { id_sku: '0040060032', id_articulo: '20', variacion: 'Transportation' },
    { id_sku: '00500100033', id_articulo: '21', variacion: 'Original' },
    { id_sku: '00500100034', id_articulo: '22', variacion: 'Chocolate' },
    { id_sku: '00100110035', id_articulo: '23', variacion: 'Verde' },
    { id_sku: '00100110036', id_articulo: '23', variacion: 'Azul' },
    { id_sku: '00100110037', id_articulo: '23', variacion: 'Rosada' },
    { id_sku: '00100120038', id_articulo: '24', variacion: 'Blanco' },
    { id_sku: '00100130039', id_articulo: '25', variacion: 'Multicolor - Chica' },
    { id_sku: '00100140040', id_articulo: '26', variacion: 'Animales de la selva' },
    { id_sku: '00100140041', id_articulo: '27', variacion: 'Transporte' },
    { id_sku: '00100150042', id_articulo: '28', variacion: 'Española - 10 colores' },
    { id_sku: '00100160043', id_articulo: '29', variacion: '18 colores' },
    { id_sku: '00100160044', id_articulo: '30', variacion: '24 colores' },
    { id_sku: '00100170045', id_articulo: '31', variacion: 'Dorado' },
    { id_sku: '00100170046', id_articulo: '32', variacion: 'Plateado' },
    { id_sku: '00600190047', id_articulo: '33', variacion: 'Verde' },
    { id_sku: '00600190048', id_articulo: '33', variacion: 'Multicolor' },
    { id_sku: '00700180049', id_articulo: '34', variacion: 'Chile' },
    { id_sku: '00700180050', id_articulo: '35', variacion: 'Murciélago' },
    { id_sku: '00700180051', id_articulo: '36', variacion: 'Tiburón' },
    { id_sku: '00100200052', id_articulo: '37', variacion: 'Set de 12 u.' },
    { id_sku: '00700210053', id_articulo: '38', variacion: '50m' },
    { id_sku: '0040060054', id_articulo: '39', variacion: 'Matemáticas 1' },
    { id_sku: '0040060055', id_articulo: '39', variacion: 'Matemáticas 2' },
    { id_sku: '0040060056', id_articulo: '39', variacion: 'Matemáticas 3' },
    { id_sku: '0040060057', id_articulo: '39', variacion: 'Matemáticas 4' },
    { id_sku: '00200220058', id_articulo: '40', variacion: 'Colores surtidos' },
    { id_sku: '0010040059', id_articulo: '41', variacion: 'Diseño 1' },
    { id_sku: '0010040060', id_articulo: '41', variacion: 'Diseño 2' },
    { id_sku: '0010040061', id_articulo: '41', variacion: 'Diseño 3' },
    { id_sku: '0010040062', id_articulo: '41', variacion: 'Diseño 4' },
    { id_sku: '0010040063', id_articulo: '41', variacion: 'Diseño 5' },
    { id_sku: '0010040064', id_articulo: '41', variacion: 'Diseño 6' },
    { id_sku: '0010040065', id_articulo: '41', variacion: 'Diseño 7' },
    { id_sku: '0010040066', id_articulo: '41', variacion: 'Diseño 8' },
    { id_sku: '0010040067', id_articulo: '42', variacion: 'Diseño 1' },
    { id_sku: '0010040068', id_articulo: '42', variacion: 'Diseño 2' },
    { id_sku: '0010040069', id_articulo: '43', variacion: 'Diseño 1' },
    { id_sku: '0010040070', id_articulo: '43', variacion: 'Diseño 2' },
    { id_sku: '0010040071', id_articulo: '43', variacion: 'Diseño 3' },
    { id_sku: '0010040072', id_articulo: '43', variacion: 'Diseño 4' },
    { id_sku: '0010040073', id_articulo: '44', variacion: 'Diseño 1' },
    { id_sku: '0010040074', id_articulo: '44', variacion: 'Diseño 2' },
    { id_sku: '0010040075', id_articulo: '44', variacion: 'Diseño 3' },
    { id_sku: '0010040076', id_articulo: '44', variacion: 'Diseño 4' },
    { id_sku: '0010040077', id_articulo: '45', variacion: 'Diseño 1' },
    { id_sku: '0010040078', id_articulo: '45', variacion: 'Diseño 2' },
    { id_sku: '0010040079', id_articulo: '45', variacion: 'Diseño 3' },
    { id_sku: '0010040080', id_articulo: '45', variacion: 'Diseño 4' },
    
]
export default skuArticulos;
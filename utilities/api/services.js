/* Aquí se asignan todos los servicos para ser renderizados dinámicamente */
const services = [
    {
        id: 1,
        name: 'Constitución de Empresas y Formalización', // Faltan imágenes
        summary: 'Sabemos que iniciar una nueva empresa requiere de grandes esfuerzos, por eso nosotros constituimos tu empresa de la manera más rápida y sin complicaciones. ',
        descriptions: [
            'Iniciar una nueva empresa requiere de grandes esfuerzos e inversión, es la parte fundamental de tu proyecto empresarial.',
            'Es importante definir qué tipo de sociedad es la más adecuada de acuerdo a la actividad a desarrollar.',
            'A futuro buscamos un desarrollo empresarial capaz de generar utilidades, brindar fuentes de trabajo y ser una de las mejores en la línea de negocios donde hemos elegido participar.',
            'Sabemos que tu tiempo es valioso y por tal motivo una asesoría profesional y especializada es necesaria antes de poner en riesgo tu inversión.'
        ],
        icon: '/icons/constitucion-empresas.svg',
        mainImage: 'https://api.abrgrupoconsultor.pe/storage/app/servicios_abr/abr-constitucion-empresa-portada.jpg', // Imagen que se mostrará en el modal y en el banner del servicio
        images: [
            '/servicios/asesoria-laboral/abr-asesoria-laboral-portal.jpg',
            '/servicios/asesoria-laboral/abr-laboral-equipo.jpg',
            '/servicios/asesoria-laboral/abr-laboral-trabajo.jpg'
        ],
        benefits: [
            'Búsqueda y reserva de nombre de su empresa.',
            'Elaboración y/o redacción del pacto social (el Acto Constitutivo).',
            'Escritura pública ante Notario.',
            'Derechos de RENIEC.',
            'Derechos Notariales.',
            'Derechos Registrales.',
            'Inscripción de su empresa en Registros Públicos (obtención de la Escritura Pública).',
            'Asesoría y trámite de RUC ante la SUNAT.',
            'Asesoría contable, tributaria y laboral previa al inicio de sus actividades.',
            'Asesoría en la legalización de libros societarios.',
            'Actualización de libros societarios.',
            'Asistencia en la elaboración de actas Juntas de Accionistas y Directorios.'
        ]
    },
    {
        id: 2,
        name: 'Contabilidad y Tributación',
        summary: 'El objetivo principal de la asesoría es brindarle un servicio de calidad, responsable y eficiente. Manténgase tranquilo dirigiendo su empresa, nosotros nos ocuparemos del cumplimiento de sus obligaciones ante la SUNAT.',
        descriptions: [
            'Tenemos amplia experiencia desarrollando la Contabilidad de empresas.',
            'La Contabilidad es una herramienta muy importante para la toma de decisiones, es por ello que nuestro objetivo es brindarle apoyo en todas las áreas que abarca el proceso contable, con el fin de que el ciclo contable constituya una herramienta útil y oportuna para el éxito de tu empresa.',
            'Nuestro servicio es brindado por profesionales de amplia experiencia que llevarán la contabilidad de tu empresa en base a la normativa tributaria vigente, evitando contingencias con SUNAT.',
            'Tenemos amplia experiencia desarrollando la Contabilidad del sector minero, industrial, comercial, servicios, construcción, entre otros. A continuación, mostramos el detalle de los servicios de Outsourcing Contable Integral:'
        ],
        icon: '/icons/contabilidad.svg',
        mainImage: 'https://api.abrgrupoconsultor.pe/storage/app/servicios_abr/portada-contabilidad-abr.jpg',
        images: [
            '/servicios/contabilidad/abr-contabilidad.jpg',
            '/servicios/contabilidad/abr-explicacion.jpg',
            '/servicios/contabilidad/portada-contabilidad-abr.jpg'
        ],
        benefits: [
            'Contabilidad Externa – Outsourcing (tercerización).',
            'Diseño y manejo de plan de cuentas.',
            'Definición de políticas contables.',
            'Registro, procesamiento y conciliaciones bancarias.',
            'Preparación y presentación de Estados Financieros Anuales.',
            'Preparación de Estados Financieros Intermedio y Adicionales (a solicitud).',
            'Elaboración de declaraciones mensuales y anuales de impuestos.',
            'Elaboración y presentación del ITAN y DAOT.',
            'Impresión y declaración de libros contables según SUNAT.',
            'Presentación de libros electrónicos – PLE.',
            'Facturación de comprobantes electrónicos.',
            'Trámite para la devolución de impuestos.',
            'Reconstrucción Contable y regularización de contabilidades.',
            'Auditorias tributaria integral y parcial.',
            'Asistencia y atención a los procesos de fiscalización realizados por SUNAT.',
            'Gestión y seguimiento de trámites diversos ante SUNAT.',
            'Capacitación en aspectos contable – tributario.',
            'Asesoría contable y tributaria permanente.'
        ]
    },
    {
        id: 3,
        name: 'Asesoría Laboral',
        summary: 'Nuestra asesoría laboral consiste en el procesamiento, manejo y control de las planillas de pago de su empresa y del cumplimiento de sus obligaciones laborales ante SUNAFIL.',
        descriptions: [
            'Nuestros servicios laborales surgen de la necesidad que tienen Nuestros clientes en fortalecer el área de recursos humanos, enfocándonos a la gestión de su personal, pudiendo ver el proceso desde el inicio del vínculo laboral, hasta la confección de la planilla de remuneraciones.',
            'Brindamos la asesoría correspondiente desde los contratos de trabajo y sus diversas modalidades, ofreciéndole la alternativa que más se adecúe a las características de su empresa. Asimismo, brindamos el servicio de búsqueda y selección de personal.'
        ],
        icon: '/icons/asesoria-laboral.svg',
        mainImage: 'https://api.abrgrupoconsultor.pe/storage/app/servicios_abr/abr-laboral-asesoria.jpg',
        images: [
            '/servicios/asesoria-laboral/abr-asesoria-laboral-portal.jpg',
            '/servicios/asesoria-laboral/abr-laboral-equipo.jpg',
            '/servicios/asesoria-laboral/abr-laboral-trabajo.jpg'
        ],
        benefits: [
            'Elaboración de contratos laborales y de locación de servicios.',
            'Altas y Bajas en el T-Registro.',
            'Elaboración de planillas de sueldo de personal y boletas de pago.',
            'Cálculo de AFP y presentación de planilla AFPNet.',
            'Asesoría en legislación laboral.',
            'Elaboración de cálculos de liquidación de beneficios sociales.',
            'Elaboración de cálculo de la Compensación por Tiempo de Servicio – CTS.',
            'Elaboración de cálculo de Gratificaciones de acuerdo a ley.',
            'Elaboración de reportes para los registros contables.',
            'Procedimientos laborales.',
            'Inspecciones y auditorias laborales - SUNAFIL.',
            'Implementación de sistema de seguridad y salud en el trabajo.',
            'Capacitación en aspectos laborales.',
            'Asesoría laboral permanente.'
        ]
    },
    {
        id: 4,
        name: 'Finanzas',
        summary: 'Evaluamos la gestión actual de su empresa y planteamos soluciones para mejorar el área de finanzas de su empresa, para así evitar la pérdida de recursos y poder acceder a un crédito financiero.',
        descriptions: [
            'El área financiera es una pieza fundamental para el desarrollo y sostenibilidad de cualquier negocio.',
            'Asistimos a nuestros clientes en la obtención de capital para ayudarlos a lograr sus objetivos estratégicos y financieros, siendo importante la preparación de información a entidades financieras o inversionistas.',
            'Es importante analizar la situación económica de la empresa, relación de gastos e ingresos para obtener una visión de la empresa en corto, mediano y largo plazo.'
        ],
        icon: '/icons/finanzas.svg',
        mainImage: 'https://api.abrgrupoconsultor.pe/storage/app/servicios_abr/abr-finanzas-portada.jpg',
        images: [
            '/servicios/finanzas/abr-ahorro-finanzas.jpg',
            '/servicios/finanzas/abr-calculando-ganancias-analisis-financiero-portada.jpg',
            '/servicios/finanzas/hombres-dandose-mano.jpg'
        ],
        benefits: [
            'Registramos operaciones contables y datos financieros.',
            'Planificar, analizar y evaluar la información registrada.',
            'Controlar las operaciones ejecutadas.',
            'Evaluación de gastos e ingresos.',
            'Elaboración de estructura de costos. ',
            'Realizar el análisis costo-beneficio.',
            'Preparación de información para entidades financieras e inversionistas.',
            'Asesoramiento para la elaboración del plan de negocios o actualización.',
            'Estados Financieros proyectados.',
            'Flujos proyectados.',
            'Buscar opciones de inversión con las que pueda contar el negocio.',
            'Buscar fuentes de financiamiento y seleccionar la más conveniente para el emprendimiento.',
            'Capacitación en aspectos financieros.',
            'Asesoría financiera permanente.'
        ]
    },
    {
        id: 5,
        name: 'Asistencia técnica para la Minería Artesanal y Pequeña Escala – MAPE',
        summary: 'Brindamos asistencia técnica para lograr concluir su proceso de formalización y post formalización, y empoderarse para que cumplan con la normativa del sector. Contamos con un equipo de profesionales con amplia experiencia en el sector MAPE.',
        descriptions: [
            'Brindamos asistencia técnica a organizaciones del sector de la MAPE, para lograr concluir su proceso de formalización, y empoderarlas para que cumplan con la normativa del sector.',
            'Implementación de criterios para exportar un oro responsable y alcanzar una certificación internacional.',
            'Contamos con un equipo de profesionales con amplia experiencia en el sector MAPE.'
        ],
        icon: '/icons/asesoria-empresarial.svg',
        mainImage: 'https://api.abrgrupoconsultor.pe/storage/app/servicios_abr/abr-mape-portada.jpg',
        images: [
            '/servicios/mape/abr-asistencia-mape1.PNG',
            '/servicios/mape/abr-carrito-minero-mape.jpg',
            '/servicios/mape/abr-seleccion-oro.jpg'
        ],
        benefits: [
            'Asesoría en el Proceso de formalización del sector minero: proceso ordinario y extraordinario (REINFO).',
            'Seguridad y Salud Ocupacional.',
            'Trazabilidad del mineral y Sistema de Control Interno (origen mineral).',
            'Implementación Sistema Prevención Lavado de Activos (origen de fondos).',
            'Cumplimiento de obligaciones tributarias y labores.',
            'Elaboración de políticas sociales de recursos humanos.',
            'Gestión Minera.',
            'Gestión Medio Ambiental.',
            'Elaboración de estudios ambientales (DIA, IGAFOM, entre otros).',
            'Cumplimiento de obligaciones mineras (ESTAMIN, DAC, entre otros).',
            'Cálculo y pago de Derecho de Vigencia y Penalidad.',
            'Renovación y seguimiento de permisos, autorizaciones y gestiones diversas.',
            'Capacitación a solicitud del cliente.',
            'Asesoría técnica permanente.'
        ]
    },
    {
        id: 6,
        name: 'Implementación de Estándares de Certificación',
        summary: 'La Pequeña Minería y Minería Artesanal al igual que otros sectores productivos, tienen actualmente una gran oportunidad de exportar al mercado internacional un producto producido responsablemente, y beneficiándose de un precio justo e incentivos.',
        descriptions: [
            'La Pequeña Minería y Minería Artesanal al igual que otros sectores productivos, tienen actualmente una gran oportunidad de exportar al mercado internacional aprovechando las ventajas y beneficios que significa hacer negocios con empresas de otros países.',
            'Los productores deben de gerenciar su empresa cumpliendo las normativas del sector y estándares internacionales para contar con una cadena de valor de producción responsable.',
            'Nuestros servicios asistirán en identificar e implementar en la organización estándares para una producción responsable, que logre exportar con las mejores condiciones e incentivos dando a su productor un valor agregado.'
        ],
        icon: '/icons/business-and-finance.svg',
        mainImage: 'https://api.abrgrupoconsultor.pe/storage/app/servicios_abr/estandares-portada.jpg',
        images: [
            '/servicios/estandares/estandares-1.jpg',
            '/servicios/estandares/estandares-2.jpg',
            '/servicios/estandares/estandares-3.jpg'
        ],
        benefits: [
            'Cadenas de suministro responsables y Debida Diligencia en zonas de conflicto y de alto riesgo.',
            'Derechos Humanos.',
            'Tecnologías limpias para la reducción del impacto ambiental.',
            'Aspectos organizativos, control interno y sostenibilidad económica.',
            'Gestión Medio Ambiental.',
            'Manejo y uso adecuado del mercurio y sustancias tóxicas y peligrosas.',
            'Condiciones laborales.',
            'Comité de premio.',
            'Trazabilidad (origen del mineral)',
            'Lavado de Activos y política anticorrupción (origen de los fondos).'
        ]
    },
    {
        id: 7,
        name: 'Alerta Minero',
        summary: 'Es un servicio de mensajería en el cual se brinda información y asistencia técnica personalizada a los mineros artesanales y de pequeña escala en el momento oportuno.',
        descriptions: [
            'Es un servicio de mensajería en el cual se brinda información y asistencia técnica personalizada a los mineros artesanales y de Pequeña escala para apoyarlos en el cumplimiento de sus obligaciones con el Estado y del proceso de formalización minera.'
        ],
        icon: '/icons/construction-and-tools.svg',
        mainImage: 'https://api.abrgrupoconsultor.pe/storage/app/servicios_abr/abr-alerta-minero-portada.png',
        images: [
            '/servicios/alerta-minero/abr-alerta-minero-1.png',
            '/servicios/alerta-minero/abr-alerta-minero-2.png',
            '/servicios/alerta-minero/abr-alerta-minero-3.png'
        ]
    },
    {
        id: 8,
        name: 'Asesoría en Gestión y Administración Empresarial',
        summary: 'La gestión y administración son actividades de máxima importancia dentro de cualquier empresa, está resulta ser fundamental para mantenerla en marcha con miras a seguir creciendo dentro del mercado.',
        descriptions: [
            'La gestión y administración son actividades de máxima importancia dentro de cualquier empresa, ésta resulta ser fundamental para mantenerla en marcha con miras a seguir creciendo dentro del mercado.',
            'Una de las formas de lograr una mayor eficiencia para una inversión menor es recurrir a la tercerización de servicios, cuyo beneficio será la reducción de costos, tiempo, control de costos que le permitirá ejecutar otras actividades y aumentar la eficiencia.',
            'Tenemos amplia experiencia desarrollando procesos de gestión y administración empresarial, mostramos el detalle de los servicios de Outsourcing que podemos brindar:'
        ],
        icon: '/icons/finanzas.svg',
        mainImage: 'https://api.abrgrupoconsultor.pe/storage/app/servicios_abr/portada-contabilidad-abr.jpg',
        images: [
            '/servicios/asesoria-gestion/gente-negocios-sentado-escritorio-oficina-trabajando-proyecto_1098-17930-min.jpg',
            '/servicios/asesoria-gestion/hombre-asesorando-aprobacion-min.jpg',
            '/servicios/asesoria-gestion/reunion-constitucion-oficina-min.jpg'
        ],
        benefits: [
            'Soporte administrativo en el inicio de operaciones.',
            'Gestión de trámite documentario.',
            'Renovación y seguimiento de licencias, permisos, autorizaciones y gestiones diversas.',
            'Emisión de comprobantes de pago de acuerdo a la solicitud del cliente.',
            'Gestión de cobranzas y pago de proveedores.',
            'Control y pago a proveedores, planilla de sueldos e impuestos.',
            'Control de las cuentas bancarias y preparación de los desembolsos de acuerdo a las necesidades de la empresa, tras la aprobación de la gerencia.',
            'Administración de fondos.',
            'Contabilidad integral.',
            'Elaboración de flujos de caja y presupuestos.',
            'Elaboración de manuales de funciones, reglamento, procedimientos, políticas, entre otros.',
            'Manejo de archivo documentario.',
            'Capacitación en gestión y administración.',
            'Asesoría en gestión y administración empresarial permanente.',
        ]
    },
    {
        id: 9,
        name: 'Comercialización y Exportación',
        summary: 'Brindamos la asesoría para la gestión e implementación de procesos comerciales, tramitología y trazabilidad de la cadena de suministro, trazabilidad documentaria que sustente el origen del producto.',
        descriptions: [
            'Nuestros servicios surgen de la necesidad que tienen nuestros clientes en comercializar localmente o exportar al mercado internacional con mejores condiciones comerciales y soluciones para cada caso.',
            'Brindamos la asesoría para la gestión e Implementación de procesos comerciales, tramitología y trazabilidad de la cadena de suministro.'
        ],
        mainImage: 'https://api.abrgrupoconsultor.pe/storage/app/servicios_abr/abr-comercio-portada.jpg',
        images: [
            '/servicios/exportacion/abr-exportacion.jpg',
            '/servicios/exportacion/abr-inspeccion-exportacion.png',
            '/servicios/exportacion/abr-planificacion-negocios-globales.jpg'
        ],
        benefits: [
            'Asistencia comercial.',
            'Trámites documentarios para la comercialización y/o exportación (requisitos).',
            'Elaboración de contratos de compra – venta.',
            'Flujograma y procedimientos de comercialización.',
            'Trazabilidad documentaria comercial.',
            'Capacitación sobre el proceso de negociación (condiciones comerciales y otros aspectos).',
            'Guía de Debida Diligencia de la OCDE.'
        ]
    },
    {
      id: 10,
      name: 'Otros servicios',
      summary: 'Otros servicios ABR Grupo consultor',
      mainImage: 'https://api.abrgrupoconsultor.pe/storage/app/servicios_abr/abr-otros-proyectos-portada.jpg',
      images: [
        '/servicios/otros-servicios/abr-otros-servicios.jpg',
        '/servicios/otros-servicios/abr-ejecucion-proyecto.jpg',
        '/servicios/otros-servicios/abr-asistencia-proyectos.jpg'
      ],
      benefits: [
        'Topografía.',
        'Sistema de Información Geográfica GIS.',
        'Gestión del Riesgo de Desastres.',
        'Elaboración de Linea Base (Física, Biologica y social).',
        'Estudios socioeconómicos.',
        'Elaboración y ejecución de proyectos.',
      ]
    }
]

// Convierte el nombre del servicio a slug
function string_to_slug (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

// Recorre cada servicio y le agrega la propiedad slug con el valor generado por string_to_slug()
services.forEach(item => {
    let slug = string_to_slug(item.name)
    item.slug = slug
})

export { services }

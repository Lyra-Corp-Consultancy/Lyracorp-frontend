export class PDF{
    generatePdf(htmlElem:string){
        try{
            const blob = new Blob([htmlElem], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'sample.pdf';
            link.click();
            link.remove()
        }catch(e){
            console.error("Error generating PDF:", e);
            throw new Error("An error occurred while generating the PDF.");
        }
    }
}
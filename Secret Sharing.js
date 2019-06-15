{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf200
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 var prime_secret_sharing = (bigInt("2").pow(bigInt("256"))).subtract(bigInt("189"));		\
function give_polynomial(k, n, secret)\
\{	\
	if (k <= 2)\
		return ["Not Possible"];\
	\
	coefficients = [];\
	\
	for (i = 0; i < (k - 1); i ++)\
	\{\
		coefficients.push(bigInt.randBetween(0, prime_secret_sharing.toString(10)).toString(10));\
	\}\
	coefficients.push(secret);\
	coordinates = [];\
	\
	for(i = 1; i < n + 1; i++)\
	\{\
		result = bigInt("0");\
		var x = bigInt(i + "");\
		for (j = 0; j < k; j ++)\
		\{\
			result = result.multiply(x);\
			result = result.add(bigInt(coefficients[j],10));\
			result = result.mod(prime_secret_sharing);\
		\}\
		\
		coordinates.push([i, result.toString(10)]);\
	\} \
	\
	return coordinates;\
	\
\}	\
\
\
function retrieve_secret(k_coordinates)\
\{\
	\
	result = bigInt("0");\
	for (i = 0; i < k_coordinates.length; i ++)\
	\{\
		numerator = bigInt("1");\
		denominator = bigInt("1");\
		\
		term = bigInt(k_coordinates[i][1]);\
		\
		for (j = 0; j < k_coordinates.length; j++)\
		\{\
			if (i == j)\
			continue;\
			\
			numerator = numerator.multiply(k_coordinates[j][0] + "");\
			denominator = denominator.multiply((k_coordinates[j][0] - k_coordinates[i][0]) + "");\
			\
		\}\
		\
		denominator = denominator.modInv(prime_secret_sharing.toString(10));\
		term = term.multiply(numerator).mod(prime_secret_sharing.toString(10));\
		term = term.multiply(denominator).mod(prime_secret_sharing.toString(10));\
		result = result.add(term.toString(10));		\
	\}\
	return result.mod(prime_secret_sharing.toString(10)).toString(16);\
	\
\}}